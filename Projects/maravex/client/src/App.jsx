import { Routes, Route } from "react-router-dom";
import { Protected } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <main>
      <Navbar />
      {/* <nav className="w-full bg-zinc-900 border-b-2 border-blue-600 flex items-center justify-between px-4 py-2 shadow-2xl">
        <Link to="/" className="text-2xl font-medium text-blue-600">
          MaraveX
        </Link>
        <div>
          {!isAuthenticated ? (
            <Link
              to="/auth/login"
              className="text-md font-semibold uppercase text-zinc-300 hover:text-blue-600 hover:scale-110 transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/auth/dashboard"
                className="text-md font-semibold uppercase text-zinc-300 hover:text-blue-600 hover:scale-110 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="text-md font-semibold uppercase text-zinc-300 hover:text-blue-600 hover:scale-110 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav> */}
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      </Routes>
      <footer></footer>
    </main>
  );
};

export default App;
