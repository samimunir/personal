import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Protected = ({ children }) => {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex items-center justify-between min-h-screen">
        <p className="text-rose-500">
          Loading <span className="animate-spin">🌀</span>
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default Protected;
