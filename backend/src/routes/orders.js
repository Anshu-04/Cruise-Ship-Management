const express = require("express");
const Order = require("../models/Order");
const Item = require("../models/Item");
const { protect, restrictTo } = require("../middleware/auth");

const router = express.Router();

// Get all orders (filtered by user for passengers)
router.get("/", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};

    // Non-admin/crew users can only see their own orders
    if (req.user.role !== "admin" && req.user.role !== "crew") {
      filter.user = req.user._id;
    }

    // Apply filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.booking) filter.booking = req.query.booking;

    const orders = await Order.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// Get order by ID
router.get("/:id", protect, async (req, res) => {
  try {
    let filter = { _id: req.params.id };

    // Non-admin/crew users can only see their own orders
    if (req.user.role !== "admin" && req.user.role !== "crew") {
      filter.user = req.user._id;
    }

    const order = await Order.findOne(filter);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// Create new order
router.post("/", protect, async (req, res) => {
  try {
    const { booking, items, delivery } = req.body;

    // Validate items and calculate pricing
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const itemDoc = await Item.findById(item.item);
      if (!itemDoc) {
        return res.status(404).json({
          success: false,
          message: `Item not found: ${item.item}`,
        });
      }

      if (itemDoc.availability === "unavailable") {
        return res.status(400).json({
          success: false,
          message: `Item unavailable: ${itemDoc.name}`,
        });
      }

      const totalPrice = itemDoc.price * item.quantity;
      subtotal += totalPrice;

      processedItems.push({
        ...item,
        unitPrice: itemDoc.price,
        totalPrice,
      });
    }

    const tax = subtotal * 0.08; // 8% tax
    const serviceCharge = subtotal * 0.15; // 15% service charge
    const totalAmount = subtotal + tax + serviceCharge;

    const order = await Order.create({
      user: req.user._id,
      booking,
      items: processedItems,
      pricing: {
        subtotal,
        tax,
        serviceCharge,
        discount: 0,
        totalAmount,
      },
      delivery: delivery || { type: "pickup" },
      payment: {
        method: req.body.paymentMethod || "room_charge",
      },
    });

    res.status(201).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// Update order status (crew/admin only)
router.patch("/:id/status", restrictTo, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

// Cancel order
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    let filter = { _id: req.params.id };

    // Non-admin/crew users can only cancel their own orders
    if (req.user.role !== "admin" && req.user.role !== "crew") {
      filter.user = req.user._id;
    }

    const order = await Order.findOne(filter);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel completed order",
      });
    }

    order.status = "cancelled";
    order.cancellationReason = req.body.reason || "Cancelled by user";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: { order },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
});

module.exports = router;
