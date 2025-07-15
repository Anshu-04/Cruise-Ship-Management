// User Roles
const USER_ROLES = {
  VOYAGER: 'voyager',
  ADMIN: 'admin',
  MANAGER: 'manager',
  HEAD_COOK: 'head-cook',
  SUPERVISOR: 'supervisor'
};

// Order Types
const ORDER_TYPES = {
  CATERING: 'catering',
  STATIONERY: 'stationery'
};

// Booking Types
const BOOKING_TYPES = {
  RESORT: 'resort',
  MOVIE: 'movie',
  BEAUTY_SALON: 'beauty-salon',
  FITNESS_CENTER: 'fitness-center',
  PARTY_HALL: 'party-hall'
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Booking Status
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Item Categories
const ITEM_CATEGORIES = {
  CATERING: {
    APPETIZERS: 'appetizers',
    MAIN_COURSE: 'main-course',
    DESSERTS: 'desserts',
    BEVERAGES: 'beverages'
  },
  STATIONERY: {
    WRITING: 'writing',
    OFFICE: 'office',
    ELECTRONICS: 'electronics',
    MISCELLANEOUS: 'miscellaneous'
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Access denied. No token provided.',
  INVALID_TOKEN: 'Invalid token.',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  RESOURCE_NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation error.',
  INTERNAL_ERROR: 'Internal server error.'
};

module.exports = {
  USER_ROLES,
  ORDER_TYPES,
  BOOKING_TYPES,
  ORDER_STATUS,
  BOOKING_STATUS,
  ITEM_CATEGORIES,
  HTTP_STATUS,
  ERROR_MESSAGES
};