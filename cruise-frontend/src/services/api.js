// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST'
    });
  },

  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST'
    });
  },

  verifyToken: async () => {
    return apiRequest('/auth/verify');
  }
};

// User Profile API
export const profileAPI = {
  getProfile: async () => {
    return apiRequest('/profile');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  changePassword: async (passwordData) => {
    return apiRequest('/profile/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  },

  uploadAvatar: async (formData) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/profile/avatar`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData
    }).then(response => response.json());
  }
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiRequest('/dashboard/stats');
  },

  getRecentActivity: async () => {
    return apiRequest('/dashboard/activity');
  },

  getNotifications: async () => {
    return apiRequest('/dashboard/notifications');
  },

  markNotificationRead: async (notificationId) => {
    return apiRequest(`/dashboard/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  }
};

// Cruise API
export const cruiseAPI = {
  getAllCruises: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/cruises${queryString ? `?${queryString}` : ''}`);
  },

  getCruiseById: async (id) => {
    return apiRequest(`/cruises/${id}`);
  },

  createCruise: async (cruiseData) => {
    return apiRequest('/cruises', {
      method: 'POST',
      body: JSON.stringify(cruiseData)
    });
  },

  updateCruise: async (id, cruiseData) => {
    return apiRequest(`/cruises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cruiseData)
    });
  },

  deleteCruise: async (id) => {
    return apiRequest(`/cruises/${id}`, {
      method: 'DELETE'
    });
  },

  getCruisePassengers: async (id) => {
    return apiRequest(`/cruises/${id}/passengers`);
  },

  getCruiseStaff: async (id) => {
    return apiRequest(`/cruises/${id}/staff`);
  }
};

// Booking API
export const bookingAPI = {
  getUserBookings: async () => {
    return apiRequest('/bookings');
  },

  createBooking: async (bookingData) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  updateBooking: async (id, bookingData) => {
    return apiRequest(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData)
    });
  },

  cancelBooking: async (id) => {
    return apiRequest(`/bookings/${id}/cancel`, {
      method: 'PUT'
    });
  },

  getBookingById: async (id) => {
    return apiRequest(`/bookings/${id}`);
  }
};

// Admin API
export const adminAPI = {
  getAllUsers: async () => {
    return apiRequest('/admin/users');
  },

  getUserById: async (id) => {
    return apiRequest(`/admin/users/${id}`);
  },

  updateUserRole: async (id, role) => {
    return apiRequest(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  },

  deleteUser: async (id) => {
    return apiRequest(`/admin/users/${id}`, {
      method: 'DELETE'
    });
  },

  getSystemStats: async () => {
    return apiRequest('/admin/stats');
  },

  getAuditLogs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/logs${queryString ? `?${queryString}` : ''}`);
  },

  exportData: async (type) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/admin/export/${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

// Staff API
export const staffAPI = {
  getAssignedCruises: async () => {
    return apiRequest('/staff/cruises');
  },

  updateCruiseStatus: async (id, status) => {
    return apiRequest(`/staff/cruises/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  getSchedule: async () => {
    return apiRequest('/staff/schedule');
  },

  updateSchedule: async (scheduleData) => {
    return apiRequest('/staff/schedule', {
      method: 'PUT',
      body: JSON.stringify(scheduleData)
    });
  },

  reportIssue: async (issueData) => {
    return apiRequest('/staff/issues', {
      method: 'POST',
      body: JSON.stringify(issueData)
    });
  }
};

// Manager API
export const managerAPI = {
  getTeamMembers: async () => {
    return apiRequest('/manager/team');
  },

  assignStaffToCruise: async (cruiseId, staffId) => {
    return apiRequest(`/manager/cruises/${cruiseId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ staffId })
    });
  },

  removeStaffFromCruise: async (cruiseId, staffId) => {
    return apiRequest(`/manager/cruises/${cruiseId}/remove`, {
      method: 'POST',
      body: JSON.stringify({ staffId })
    });
  },

  approveBooking: async (bookingId) => {
    return apiRequest(`/manager/bookings/${bookingId}/approve`, {
      method: 'PUT'
    });
  },

  rejectBooking: async (bookingId, reason) => {
    return apiRequest(`/manager/bookings/${bookingId}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason })
    });
  },

  getReports: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/manager/reports${queryString ? `?${queryString}` : ''}`);
  }
};

// Search API
export const searchAPI = {
  searchCruises: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/search/cruises?${queryString}`);
  },

  searchUsers: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/search/users?${queryString}`);
  },

  getSearchSuggestions: async (query, type) => {
    const params = { q: query, type };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/search/suggestions?${queryString}`);
  }
};

// File Upload API
export const fileAPI = {
  uploadFile: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData
    }).then(response => response.json());
  },

  deleteFile: async (fileId) => {
    return apiRequest(`/files/${fileId}`, {
      method: 'DELETE'
    });
  },

  getFileUrl: (fileId) => {
    return `${API_BASE_URL}/files/${fileId}`;
  }
};

// Notification API
export const notificationAPI = {
  getNotifications: async () => {
    return apiRequest('/notifications');
  },

  markAsRead: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  },

  markAllAsRead: async () => {
    return apiRequest('/notifications/read-all', {
      method: 'PUT'
    });
  },

  deleteNotification: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}`, {
      method: 'DELETE'
    });
  },

  getNotificationSettings: async () => {
    return apiRequest('/notifications/settings');
  },

  updateNotificationSettings: async (settings) => {
    return apiRequest('/notifications/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }
};

// Utility Functions
export const utils = {
  // Format currency
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Format date
  formatDate: (date, options = {}) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    });
  },

  // Format date and time
  formatDateTime: (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Generate random ID
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Storage helpers
  storage: {
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },

    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },

    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },

    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  },

  // Error handling
  handleAPIError: (error) => {
    if (error.message.includes('401')) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.message.includes('403')) {
      // Forbidden - show access denied message
      return 'Access denied. You do not have permission to perform this action.';
    } else if (error.message.includes('404')) {
      // Not found
      return 'The requested resource was not found.';
    } else if (error.message.includes('500')) {
      // Server error
      return 'Server error. Please try again later.';
    } else {
      // Generic error
      return error.message || 'An unexpected error occurred.';
    }
  }
};

// Export default API object
export default {
  auth: authAPI,
  profile: profileAPI,
  dashboard: dashboardAPI,
  cruises: cruiseAPI,
  bookings: bookingAPI,
  admin: adminAPI,
  staff: staffAPI,
  manager: managerAPI,
  search: searchAPI,
  files: fileAPI,
  notifications: notificationAPI,
  utils
};