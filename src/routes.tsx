import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);