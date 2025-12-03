// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [meData, setMeData] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setMeData(res.data.user);
      } catch (err) {
        console.error("Failed to fetch /me", err);
      }
    };
    fetchMe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-indigo-400">
            mern-auth
          </span>
          <button
            onClick={logout}
            className="text-xs text-slate-300 hover:text-red-300 border border-slate-700 rounded-md px-3 py-1"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-xl font-semibold mb-2 text-slate-50">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400 mb-4">
            You are authenticated. This page is protected by JWT-based auth.
          </p>

          <div className="text-sm text-slate-200 space-y-2">
            <div>
              <span className="font-semibold text-slate-300">Email:</span>{" "}
              {user?.email}
            </div>
            <div>
              <span className="font-semibold text-slate-300">Role:</span>{" "}
              {user?.role || "user"}
            </div>
            <div>
              <span className="font-semibold text-slate-300">Created:</span>{" "}
              {user?.createdAt.substring(0, 10) || "Recently"}
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-400">
            <p className="mb-1">/api/auth/me response:</p>
            <pre className="max-h-40 overflow-auto bg-slate-950/70 border border-slate-800 rounded-md p-3 text-[11px]">
              {meData ? JSON.stringify(meData, null, 2) : "Loading..."}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
