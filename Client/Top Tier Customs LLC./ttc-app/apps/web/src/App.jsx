import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main.jsx";
import Protected from "./layouts/Protected.jsx";
import Landing from "./pages/Landing.jsx";
import AuthPages from "./pages/Auth.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          <Main>
            <Landing />
          </Main>
        }
      />
      <Route path="/auth" element={<AuthPages />} />
      <Route
        path="/dashboard"
        index
        element={
          <Protected allowedRoles={["customer"]}>
            <Main>
              <CustomerDashboard />
            </Main>
          </Protected>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <Protected allowedRoles={["admin"]}>
            <AdminDashboard />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
