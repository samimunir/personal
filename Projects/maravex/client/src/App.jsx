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
