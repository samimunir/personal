import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main.jsx";
import Protected from "./layouts/Protected.jsx";
import Landing from "./pages/Landing.jsx";
import AuthPages from "./pages/Auth.jsx";
import ProductsPage from "./pages/Products.jsx";
import ServicesPage from "./pages/Services.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";

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
      <Route path="/products" index element={<ProductsPage />} />
      <Route path="/services" index element={<ServicesPage />} />
      <Route
        path="/dashboard"
        index
        element={
          <Protected>
            <CustomerDashboard />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
