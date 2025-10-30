import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Writing from "./pages/Writing";
import Contact from "./pages/Contact";
import PostPage from "./pages/PostPage";
import CaseStudy from "./pages/CaseStudy";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "work", element: <Work /> },
      { path: "work/:slug", element: <CaseStudy /> },
      { path: "about", element: <About /> },
      { path: "writing", element: <Writing /> },
      { path: "writing/:slug", element: <PostPage /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
