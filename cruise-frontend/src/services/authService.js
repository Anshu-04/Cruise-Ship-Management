// frontend/src/services/authService.js
const API_BASE_URL = "http://localhost:5000/api";

class AuthService {
  // Helper method for API calls
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`Making API call to: ${url}`);
      const response = await fetch(url, config);
      const data = await response.json();

      console.log("API Response:", data);

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

  // register method
  async register(userData) {
    try {
      const response = await this.apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw new Error(error.message || "register failed");
    }
  }

  // Login method
  async login(credentials) {
    try {
      const response = await this.apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  // Get auth token
  getToken() {
    return localStorage.getItem("token");
  }

  // Test server connection
  async testConnection() {
    try {
      const response = await this.apiCall("/health");
      return response;
    } catch (error) {
      throw new Error("Cannot connect to server");
    }
  }
}

export default new AuthService();
