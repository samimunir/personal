import { Routes, Route } from "react-router-dom";

import Main from "./layouts/Main";
import Landing from "./pages/Landing";
import Products from "./pages/Products";

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
    </Routes>
  );
};

export default App;
