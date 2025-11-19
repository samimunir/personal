import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Protected = ({ children }, allowedRoles = []) => {
  const { user, isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex items-center justify-between min-h-screen">
        <p className="text-rose-500 text-5xl uppercase font-medium">
          Loading <span className="animate-spin">🌀</span>
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length === 0) {
    return children;
  }

  const userRoles = user?.roles || [];

  const hasPermission = userRoles.some((role) => allowedRoles.includes(role));
  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600 font-semibold">
          Access Denied - Insufficient Permissions
        </p>
      </div>
    );
  }

  return children;
};

export default Protected;
