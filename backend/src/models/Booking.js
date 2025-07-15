// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  cruiseDetails: {
    shipName: { type: String, required: true },
    cruiseCode: { type: String, required: true },
    route: { type: String, required: true },
    departureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    departurePort: { type: String, required: true },
    returnPort: { type: String, required: true }
  },
  cabin: {
    type: {
      type: String,
      required: true,
      enum: ['interior', 'oceanview', 'balcony', 'suite']
    },
    number: { type: String, required: true },
    deck: { type: Number, required: true },
    capacity: { type: Number, required: true, min: 1 }
  },
  passengers: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    passportNumber: { type: String },
    passportExpiry: { type: Date },
    dietaryRequirements: [String],
    specialNeeds: [String],
    isPrimary: { type: Boolean, default: false }
  }],
  pricing: {
    basePrice: { type: Number, required: true, min: 0 },
    taxes: { type: Number, required: true, min: 0 },
    fees: { type: Number, default: 0, min: 0 },
    discounts: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash']
    },
    status: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'refunded', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    paidAmount: { type: Number, default: 0 },
    paymentDate: Date,
    dueDate: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'pending'
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  },
  specialRequests: [{
    type: String,
    trim: true
  }],
  insurance: {
    isSelected: { type: Boolean, default: false },
    provider: String,
    cost: { type: Number, default: 0 },
    coverage: String
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkedInAt: Date,
  notes: String
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = 'CRS' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Calculate total passengers
bookingSchema.virtual('totalPassengers').get(function() {
  return this.passengers.length;
});

// Calculate cruise duration
bookingSchema.virtual('cruiseDuration').get(function() {
  if (this.cruiseDetails.departureDate && this.cruiseDetails.returnDate) {
    return Math.ceil((this.cruiseDetails.returnDate - this.cruiseDetails.departureDate) / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Index for efficient queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ 'cruiseDetails.departureDate': 1 });

module.exports = mongoose.model('Booking', bookingSchema);
