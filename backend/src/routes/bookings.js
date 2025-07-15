const express = require('express');
const Booking = require('../models/Booking');
const { protect, restrictTo, requireCompleteProfile } = require('../middleware/auth');

const router = express.Router();

// Get all bookings (admin/crew) or user's bookings
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    // Non-admin users can only see their own bookings
    if (req.user.role !== 'admin' && req.user.role !== 'crew') {
      filter.user = req.user._id;
    }

    // Apply filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.shipName) filter['cruiseDetails.shipName'] = new RegExp(req.query.shipName, 'i');
    if (req.query.departureDate) {
      filter['cruiseDetails.departureDate'] = {
        $gte: new Date(req.query.departureDate)
      };
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get booking by ID
router.get('/:id', protect, async (req, res) => {
  try {
    let filter = { _id: req.params.id };
    
    // Non-admin users can only see their own bookings
    if (req.user.role !== 'admin' && req.user.role !== 'crew') {
      filter.user = req.user._id;
    }

    const booking = await Booking.findOne(filter).populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

// Create new booking
router.post('/', protect, requireCompleteProfile, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user._id
    };

    const booking = await Booking.create(bookingData);
    await booking.populate('user', 'firstName lastName email');

    res.status(201).json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// Update booking
router.patch('/:id', protect, async (req, res) => {
  try {
    let filter = { _id: req.params.id };
    
    // Non-admin users can only update their own bookings
    if (req.user.role !== 'admin' && req.user.role !== 'crew') {
      filter.user = req.user._id;
    }

    const booking = await Booking.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message
    });
  }
});

// Cancel booking
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    let filter = { _id: req.params.id };
    
    // Non-admin users can only cancel their own bookings
    if (req.user.role !== 'admin' && req.user.role !== 'crew') {
      filter.user = req.user._id;
    }

    const booking = await Booking.findOneAndUpdate(
      filter,
      { 
        status: 'cancelled',
        notes: req.body.reason || 'Cancelled by user'
      },
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// Check-in booking (crew/admin only) - FIXED: protect comes before restrictTo
router.patch('/:id/checkin', protect, restrictTo('admin', 'crew'), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        checkedIn: true,
        checkedInAt: new Date()
      },
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Passenger checked in successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to check in passenger',
      error: error.message
    });
  }
});

module.exports = router;