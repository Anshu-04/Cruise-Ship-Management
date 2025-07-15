// Role-based authorization middleware
const roleAuth = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists (should be set by auth middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Please login first.'
        });
      }

      // Check if user role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }

      next();
    } catch (error) {
      console.error('Role auth error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during authorization'
      });
    }
  };
};

// Specific role middleware functions
const adminOnly = roleAuth('admin');
const managerOnly = roleAuth('manager');
const voyagerOnly = roleAuth('voyager');
const headCookOnly = roleAuth('head-cook');
const supervisorOnly = roleAuth('supervisor');

// Combined role middleware
const adminOrManager = roleAuth('admin', 'manager');
const staffOnly = roleAuth('manager', 'head-cook', 'supervisor');
const allRoles = roleAuth('admin', 'manager', 'voyager', 'head-cook', 'supervisor');

// Kitchen staff (for catering orders)
const kitchenStaff = roleAuth('manager', 'head-cook');

// Stationery staff (for stationery orders)
const stationeryStaff = roleAuth('manager', 'supervisor');

// Booking management staff
const bookingStaff = roleAuth('admin', 'manager');

module.exports = {
  roleAuth,
  adminOnly,
  managerOnly,
  voyagerOnly,
  headCookOnly,
  supervisorOnly,
  adminOrManager,
  staffOnly,
  allRoles,
  kitchenStaff,
  stationeryStaff,
  bookingStaff
};