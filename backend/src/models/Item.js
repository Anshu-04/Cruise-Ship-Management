// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'dining',
      'entertainment',
      'spa',
      'excursions',
      'drinks',
      'specialty_dining',
      'fitness',
      'shopping',
      'activities',
      'wifi',
      'laundry',
      'photography'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD']
  },
  availability: {
    type: String,
    enum: ['available', 'limited', 'unavailable'],
    default: 'available'
  },
  maxQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  location: {
    type: String,
    required: function() {
      return ['dining', 'entertainment', 'spa', 'fitness'].includes(this.category);
    }
  },
  ageRestriction: {
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 120 }
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    alt: String
  }],
  specialRequirements: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for search functionality
itemSchema.index({ name: 'text', description: 'text', tags: 'text' });
itemSchema.index({ category: 1, availability: 1 });

module.exports = mongoose.model('Item', itemSchema);

