import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session/token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token with backend
          const response = await fetch("/api/verify-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem("token", token);
        setUser(user);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  // AuthContext.jsx  (inside AuthProvider)

  // 1️⃣  Centralise the API base so it works in dev ⬅️ and prod ➡️
  const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || ""; // "" = same origin

  // 2️⃣  Pure‑fetch register
  const register = async ({ fullName, email, password }) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/auth/register`, // ⬅️ updated path
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
          // If you switch to cookie‑based auth later, add:
          // credentials: "include",
        }
      );

      if (!res.ok) {
        // Expect your Express error handler to return { message }
        const { message } = await res.json();
        return { success: false, error: message };
      }

      const { token, user } = await res.json();
      localStorage.setItem("token", token);
      setUser(user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "register failed. Please try again." };
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Named export for the context itself (if needed elsewhere)
export { AuthContext };
