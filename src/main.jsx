import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes/Route.jsx";
import Login from "./Components/Login/Login.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import BlogDetail from "./Components/Blogs/BlogDetail.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Routes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "Blogs/:id", // Dynamic route for blog details
        element: <BlogDetail />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Admin",
        element: <Admin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
