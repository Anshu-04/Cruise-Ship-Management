const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking is required']
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, 'Unit price must be positive']
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be positive']
    },
    scheduledDate: Date,
    scheduledTime: String,
    specialInstructions: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'pending'
    }
  }],
  pricing: {
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    serviceCharge: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['room_charge', 'credit_card', 'cash', 'loyalty_points']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  delivery: {
    type: {
      type: String,
      enum: ['room_service', 'pickup', 'venue_service', 'digital'],
      default: 'pickup'
    },
    location: String,
    instructions: String,
    estimatedTime: Date,
    actualTime: Date,
    deliveryPerson: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  notes: String,
  cancellationReason: String,
  refundAmount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Calculate total items
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Pre-populate references
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName email'
  }).populate({
    path: 'booking',
    select: 'bookingReference cabin.number cruiseDetails.shipName'
  }).populate({
    path: 'items.item',
    select: 'name category price'
  });
  next();
});

// Index for efficient queries
orderSchema.index({ user: 1, status: 1 });
orderSchema.index({ booking: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);