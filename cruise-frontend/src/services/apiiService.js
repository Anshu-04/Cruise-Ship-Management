// frontend/src/services/apiService.js
const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Generic API call method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: "GET",
      headers: this.getAuthHeaders(),
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      console.log(`API Request: ${config.method} ${url}`);
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Auth endpoints
  auth = {
    login: (credentials) =>
      this.request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),

    register: (userData) =>
      this.request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    logout: () =>
      this.request("/auth/logout", {
        method: "POST",
      }),
  };

  // Booking endpoints
  bookings = {
    getAll: () => this.request("/bookings"),
    getById: (id) => this.request(`/bookings/${id}`),
    create: (bookingData) =>
      this.request("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      }),
    update: (id, bookingData) =>
      this.request(`/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(bookingData),
      }),
    delete: (id) =>
      this.request(`/bookings/${id}`, {
        method: "DELETE",
      }),
  };

  // Items endpoints
  items = {
    getAll: () => this.request("/items"),
    getById: (id) => this.request(`/items/${id}`),
    create: (itemData) =>
      this.request("/items", {
        method: "POST",
        body: JSON.stringify(itemData),
      }),
    update: (id, itemData) =>
      this.request(`/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(itemData),
      }),
    delete: (id) =>
      this.request(`/items/${id}`, {
        method: "DELETE",
      }),
  };

  // Orders endpoints
  orders = {
    getAll: () => this.request("/orders"),
    getById: (id) => this.request(`/orders/${id}`),
    create: (orderData) =>
      this.request("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    update: (id, orderData) =>
      this.request(`/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(orderData),
      }),
    delete: (id) =>
      this.request(`/orders/${id}`, {
        method: "DELETE",
      }),
  };

  // Health check
  health = () => this.request("/health");
}

export default new ApiService();
