const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, available, search } = req.query;
    
    let filter = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Item.countDocuments(filter);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: { item }
    });
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Private (Admin only)
const createItem = async (req, res) => {
  try {
    const { name, description, price, type, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || !type) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and type are required'
      });
    }

    // Validate type
    if (!['catering', 'stationery'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either catering or stationery'
      });
    }

    // Check if item already exists
    const existingItem = await Item.findOne({ name, type });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Item already exists with this name and type'
      });
    }

    // Create item
    const item = await Item.create({
      name,
      description,
      price,
      type,
      category,
      imageUrl
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: { item }
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during item creation'
    });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private (Admin only)
const updateItem = async (req, res) => {
  try {
    const { name, description, price, type, category, imageUrl, isAvailable } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if name is being changed and if it conflicts with existing items
    if (name && name !== item.name) {
      const existingItem = await Item.findOne({ 
        name, 
        type: type || item.type,
        _id: { $ne: item._id }
      });
      
      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: 'Item already exists with this name and type'
        });
      }
    }

    // Update item
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price && { price }),
        ...(type && { type }),
        ...(category !== undefined && { category }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isAvailable !== undefined && { isAvailable })
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: { item: updatedItem }
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private (Admin only)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle item availability
// @route   PATCH /api/items/:id/toggle-availability
// @access  Private (Admin only)
const toggleItemAvailability = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json({
      success: true,
      message: `Item ${item.isAvailable ? 'made available' : 'made unavailable'} successfully`,
      data: { item }
    });
  } catch (error) {
    console.error('Toggle item availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get items by type
// @route   GET /api/items/type/:type
// @access  Public
const getItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 10, category, available } = req.query;
    
    if (!['catering', 'stationery'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be catering or stationery'
      });
    }

    let filter = { type };
    
    if (category) {
      filter.category = category;
    }
    
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Item.countDocuments(filter);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get items by type error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get item categories
// @route   GET /api/items/categories/:type
// @access  Public
const getItemCategories = async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['catering', 'stationery'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be catering or stationery'
      });
    }

    const categories = await Item.distinct('category', { type });

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get item categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get item statistics
// @route   GET /api/items/stats
// @access  Private (Admin only)
const getItemStats = async (req, res) => {
  try {
    const stats = await Item.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            isAvailable: '$isAvailable'
          },
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          availability: {
            $push: {
              isAvailable: '$_id.isAvailable',
              count: '$count',
              avgPrice: '$avgPrice'
            }
          },
          totalItems: { $sum: '$count' }
        }
      }
    ]);

    // Get total counts
    const totalItems = await Item.countDocuments();
    const availableItems = await Item.countDocuments({ isAvailable: true });
    const unavailableItems = await Item.countDocuments({ isAvailable: false });

    res.json({
      success: true,
      data: {
        stats,
        overview: {
          totalItems,
          availableItems,
          unavailableItems
        }
      }
    });
  } catch (error) {
    console.error('Get item stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  toggleItemAvailability,
  getItemsByType,
  getItemCategories,
  getItemStats
};