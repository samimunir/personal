// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken as setAxiosAccessToken } from "../api/axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// "status" helps us handle loading UX
// 'loading' | 'authenticated' | 'unauthenticated'
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState("loading"); // start as loading

  // Sync axios module token whenever it changes
  const applyAccessToken = (token) => {
    setAccessToken(token);
    setAxiosAccessToken(token);
  };

  // Runs once on app load: try to restore session via refresh token cookie
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/api/auth/refresh", {});
        setUser(res.data.user);
        applyAccessToken(res.data.accessToken);
        setStatus("authenticated");
      } catch (err) {
        setUser(null);
        applyAccessToken(null);
        setStatus("unauthenticated");
      }
    };

    initAuth();
  }, []);

  const register = async (email, password) => {
    const res = await api.post("/api/auth/register", { email, password });
    setUser(res.data.user);
    applyAccessToken(res.data.accessToken);
    setStatus("authenticated");
  };

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    applyAccessToken(res.data.accessToken);
    setStatus("authenticated");
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {});
    } catch (err) {
      // ignore errors here; we still clear client-side state
    }
    setUser(null);
    applyAccessToken(null);
    setStatus("unauthenticated");
  };

  const value = {
    user,
    accessToken,
    status,
    register,
    login,
    logout,
    isAuthenticated: status === "authenticated" && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
