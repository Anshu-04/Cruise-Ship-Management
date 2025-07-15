const { body, param, validationResult } = require('express-validator');
const { USER_ROLES, ORDER_TYPES, BOOKING_TYPES } = require('./constants');

// Common validation rules
const commonValidations = {
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  name: body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  role: body('role')
    .isIn(Object.values(USER_ROLES))
    .withMessage('Invalid user role'),
  
  objectId: (field) => param(field)
    .isMongoId()
    .withMessage(`Invalid ${field} format`)
};

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Specific validation rules for different endpoints
const validationRules = {
  // Auth validations
  register: [
    commonValidations.name,
    commonValidations.email,
    commonValidations.password,
    body('cabin')
      .optional()
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Cabin number must be between 1 and 10 characters'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Please provide a valid phone number')
  ],
  
  login: [
    commonValidations.email,
    commonValidations.password
  ],
  
  // Admin create user
  createUser: [
    commonValidations.name,
    commonValidations.email,
    commonValidations.password,
    commonValidations.role,
    body('cabin')
      .optional()
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Cabin number must be between 1 and 10 characters')
  ],
  
  // Order validations
  createOrder: [
    body('type')
      .isIn(Object.values(ORDER_TYPES))
      .withMessage('Invalid order type'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('At least one item is required'),
    body('items.*.itemId')
      .isMongoId()
      .withMessage('Invalid item ID'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('totalAmount')
      .isFloat({ min: 0 })
      .withMessage('Total amount must be a positive number')
  ],
  
  // Booking validations
  createBooking: [
    body('type')
      .isIn(Object.values(BOOKING_TYPES))
      .withMessage('Invalid booking type'),
    body('date')
      .isISO8601()
      .withMessage('Invalid date format'),
    body('timeSlot')
      .trim()
      .notEmpty()
      .withMessage('Time slot is required'),
    body('guests')
      .isInt({ min: 1, max: 10 })
      .withMessage('Number of guests must be between 1 and 10')
  ],
  
  // Item validations
  createItem: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Item name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Item name must be between 2 and 100 characters'),
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters')
  ],
  
  // Generic ID validation
  validateId: [commonValidations.objectId('id')]
};

module.exports = {
  validationRules,
  validateRequest
};