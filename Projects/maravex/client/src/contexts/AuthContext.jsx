import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setSession = useCallback((userData, token) => {
    setUser(userData || null);
    setAccessToken(token || null);
  }, []);

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await api.post("/auth/login", { email, password });
        const { user: userData, accessToken: token } = res.data;

        setSession(userData, token);

        return { user: userData, accessToken: token };
      } catch (e) {
        const message =
          e.response?.data?.message || "Login failed. Please try again.";

        setError(message);

        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [setSession]
  );

  const logout = useCallback(async () => {
    setError(null);

    try {
      await api.post("/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      console.error(`Logout failure: ${e}`);
      return;
    } finally {
      setSession(null, null);
    }
  }, [setSession]);

  const refreshAccessToken = useCallback(async () => {
    try {
      console.log("<AuthContext>.refreshAccessToken()");
      const res = await api.post("/auth/refresh", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { accessToken: newToken } = res.data || {};

      if (!newToken) {
        setSession(null, null);

        return null;
      }

      const meRes = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${newToken}` },
      });

      const userData = meRes?.data?.user || meRes.data;

      setSession(userData, newToken);

      return newToken;
    } catch (e) {
      setSession(null, null);

      return null;
    }
  }, [setSession]);

  const authFetch = useCallback(
    async (config) => {
      try {
        const res = await api({
          ...config,
          headers: {
            ...(config.headers || {}),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        });

        return res;
      } catch (e) {
        if (e.response?.status === 401 || e.response?.status === 403) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            const retryRes = await api({
              ...config,
              headers: {
                ...(config.headers || {}),
                Authorization: `Bearer ${newToken}`,
              },
            });

            return retryRes;
          }
        }

        throw e;
      }
    },
    [accessToken, refreshAccessToken]
  );

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        await refreshAccessToken();
        console.log("<AuthContext>.useEffect()");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [refreshAccessToken]);

  const isAuthenticated = !!user;
  console.log(`<AuthContext>.isAuthenticated: ${isAuthenticated}`);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      refreshAccessToken,
      authFetch,
      setError,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      refreshAccessToken,
      authFetch,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return ctx;
};

export const Protected = ({ children, requireRole, redirectTo = "/auth" }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center content-center bg-zinc-900">
        <h1 className="text-5xl text-rose-600">Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};
