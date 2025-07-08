import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/home/Home/Authentications/Login/Login";
import Register from "../pages/home/Home/Authentications/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
     
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    // children: [
    //   {
    //     index: true,
    //     element: <DashboardHome />,
    //   },
    //   {
    //     path: "edit-profile",
    //     element: <EditProfile />,
    //   },
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  
]);