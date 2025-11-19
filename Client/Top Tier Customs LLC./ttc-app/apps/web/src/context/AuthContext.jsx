// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import {
  getStoredUser,
  saveAuthData,
  clearAuthData,
  getRefreshToken,
} from "../auth/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredUser());
  const [initializing, setInitializing] = useState(true);

  // Optional: verify stored refresh token on load, or just trust it for now
  useEffect(() => {
    // For now, we just mark initialization done
    setInitializing(false);
  }, []);

  async function register(formData) {
    const res = await api.post("/auth/register", formData);
    const { user: userData, tokens } = res.data;

    saveAuthData({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userData,
    });

    setUser(userData);
    setIsAuthenticated(true);

    return userData;
  }

  async function login({ email, password }) {
    const res = await api.post("/auth/login", { email, password });
    const { user: userData, tokens } = res.data;

    saveAuthData({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userData,
    });

    setUser(userData);
    setIsAuthenticated(true);

    return userData;
  }

  async function logout() {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (err) {
      // ignore errors on logout
      console.error("Logout error:", err);
    } finally {
      clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  const value = {
    user,
    isAuthenticated,
    initializing,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
