import { Routes, Route } from "react-router-dom";

import Main from "./layouts/Main";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <Main>
            <Landing />
          </Main>
        }
      />
      <Route
        path="/shop"
        element={
          <Main>
            <Products />
          </Main>
        }
      />
      <Route
        path="/services"
        element={
          <Main>
            <Services />
          </Main>
        }
      />
      <Route
        path="/about"
        element={
          <Main>
            <About />
          </Main>
        }
      />
      <Route
        path="/contact"
        element={
          <Main>
            <Contact />
          </Main>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Main>
            <CustomerDashboard />
          </Main>
        }
      />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
