// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-900">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
          mern-auth playground
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          A dedicated project to explore robust authentication & authorization
          in a MERN stack using JWT access & refresh tokens.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-sm font-medium text-white"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-sm font-medium text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-sm font-medium text-slate-200"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
