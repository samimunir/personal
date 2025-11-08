import { Routes, Route } from "react-router-dom";

import Main from "./layouts/Main";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Services from "./pages/Services";

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
    </Routes>
  );
};

export default App;
