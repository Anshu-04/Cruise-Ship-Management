const express = require('express');
const Item = require('../models/Item');
const { protect } = require('../middleware/auth');
const { adminOnly, adminOrManager } = require('../middleware/roleAuth');

const router = express.Router();

// @route   GET /api/items
// @desc    Get all items with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    
    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by availability
    if (req.query.available !== undefined) {
      filter.available = req.query.available === 'true';
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Search by name or description
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortBy = { createdAt: -1 }; // Default sort by newest
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sortBy = { price: 1 };
          break;
        case 'price-desc':
          sortBy = { price: -1 };
          break;
        case 'name':
          sortBy = { name: 1 };
          break;
        case 'category':
          sortBy = { category: 1 };
          break;
        default:
          sortBy = { createdAt: -1 };
      }
    }

    const items = await Item.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const totalItems = await Item.countDocuments(filter);

    // Get categories for filtering
    const categories = await Item.distinct('category');

    res.json({
      success: true,
      items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        hasNextPage: page < Math.ceil(totalItems / limit),
        hasPrevPage: page > 1
      },
      categories
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching items' 
    });
  }
});

// @route   GET /api/items/categories/list
// @desc    Get all unique categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Item.distinct('category');
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching categories' 
    });
  }
});

// @route   GET /api/items/search/advanced
// @desc    Advanced search with multiple filters
// @access  Public
router.get('/search/advanced', async (req, res) => {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      available,
      inStock,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build aggregation pipeline
    const pipeline = [];

    // Match stage
    const matchStage = {};
    
    if (q) {
      matchStage.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (category) {
      matchStage.category = category;
    }

    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseFloat(minPrice);
      if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice);
    }

    if (available !== undefined) {
      matchStage.available = available === 'true';
    }

    if (inStock === 'true') {
      matchStage.stock = { $gt: 0 };
    }

    pipeline.push({ $match: matchStage });

    // Sort stage
    let sortStage = { createdAt: -1 };
    if (sort) {
      switch (sort) {
        case 'price-asc':
          sortStage = { price: 1 };
          break;
        case 'price-desc':
          sortStage = { price: -1 };
          break;
        case 'name':
          sortStage = { name: 1 };
          break;
        case 'stock':
          sortStage = { stock: -1 };
          break;
      }
    }
    pipeline.push({ $sort: sortStage });

    // Pagination
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });

    const items = await Item.aggregate(pipeline);
    const totalItems = await Item.countDocuments(matchStage);

    res.json({
      success: true,
      items,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / parseInt(limit)),
        totalItems,
        hasNextPage: parseInt(page) < Math.ceil(totalItems / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error performing search' 
    });
  }
});

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
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
      item
    });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching item' 
    });
  }
});

// @route   POST /api/items
// @desc    Create new item
// @access  Private/Admin or Manager
router.post('/', protect, adminOrManager, async (req, res) => {
  try {
    const { name, description, price, category, available, stock, image } = req.body;

    // Validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, description, price, and category' 
      });
    }

    // Check if item with same name already exists
    const existingItem = await Item.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item with this name already exists' 
      });
    }

    const item = new Item({
      name,
      description,
      price,
      category,
      available: available !== undefined ? available : true,
      stock: stock || 0,
      image
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating item' 
    });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private/Admin or Manager
router.put('/:id', protect, adminOrManager, async (req, res) => {
  try {
    const { name, description, price, category, available, stock, image } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category) updateData.category = category;
    if (available !== undefined) updateData.available = available;
    if (stock !== undefined) updateData.stock = stock;
    if (image) updateData.image = image;

    // Check if another item has the same name (if name is being updated)
    if (name) {
      const existingItem = await Item.findOne({ 
        name, 
        _id: { $ne: req.params.id } 
      });
      if (existingItem) {
        return res.status(400).json({ 
          success: false, 
          message: 'Another item with this name already exists' 
        });
      }
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating item' 
    });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private/Admin Only
router.delete('/:id', protect, adminOnly, async (req, res) => {
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
      message: 'Server error deleting item' 
    });
  }
});

// @route   PATCH /api/items/:id/availability
// @desc    Update item availability
// @access  Private/Admin or Manager
router.patch('/:id/availability', protect, adminOrManager, async (req, res) => {
  try {
    const { available } = req.body;

    if (available === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide availability status' 
      });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    res.json({
      success: true,
      message: `Item ${available ? 'enabled' : 'disabled'} successfully`,
      item
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating availability' 
    });
  }
});

// @route   PATCH /api/items/:id/stock
// @desc    Update item stock
// @access  Private/Admin or Manager
router.patch('/:id/stock', protect, adminOrManager, async (req, res) => {
  try {
    const { stock, operation } = req.body;

    if (stock === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide stock quantity' 
      });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Handle different stock operations
    let newStock = item.stock;
    switch (operation) {
      case 'add':
        newStock += stock;
        break;
      case 'subtract':
        newStock = Math.max(0, newStock - stock);
        break;
      case 'set':
      default:
        newStock = stock;
        break;
    }

    item.stock = newStock;
    await item.save();

    res.json({
      success: true,
      message: 'Stock updated successfully',
      item
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating stock' 
    });
  }
});

module.exports = router;