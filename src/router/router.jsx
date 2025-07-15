import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/home/Home/Authentications/Login/Login";
import Register from "../pages/home/Home/Authentications/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AllDonations from "../pages/AllDonations/AllDonations";
import DashboardHome from "../pages/home/Home/Dashboard/DashboardHome";
import AddDonation from "../pages/home/Home/Dashboard/RestaurantDonations/AddDonation";
import MyDonations from "../pages/home/Home/Dashboard/RestaurantDonations/MyDonations";
import UpdateDonationForm from "../pages/home/Home/Dashboard/RestaurantDonations/UpdateDonationForm";
import RestaurantProfile from "../pages/home/Home/Dashboard/RestaurantDonations/profile/RestaurantProfile";
import RequestedDonations from "../pages/home/Home/Dashboard/RestaurantDonations/RequestedDonations";
import Forbidden from "../components/Forbidden";

import NotFound from "../components/NotFound";
import AdminProfile from "../pages/home/Home/Dashboard/AdminDashboard/AdminProfile";
import AdminManageDonations from "../pages/home/Home/Dashboard/AdminDashboard/AdminManageDonations";
import AdminManageUsers from "../pages/home/Home/Dashboard/AdminDashboard/AdminManageUsers";
import ManageRoleRequests from "../pages/home/Home/Dashboard/AdminDashboard/ManageRoleRequests";
import ManageRequests from "../pages/home/Home/Dashboard/AdminDashboard/ManageRequests ";
import FeatureDonations from "../pages/home/Home/Dashboard/AdminDashboard/FeatureDonations ";
import CharityProfile from "../pages/home/Home/Dashboard/CharityDashboard/CharityProfile";
import MyRequests from "../pages/home/Home/Dashboard/CharityDashboard/MyRequests";
import MyPickups from "../pages/home/Home/Dashboard/CharityDashboard/MyPickups";
import ReceivedDonations from "../pages/home/Home/Dashboard/CharityDashboard/ReceivedDonations";
import RequestCharity from "../pages/home/Home/Dashboard/CharityDashboard/RequestCharity";
import TransactionHistory from "../pages/home/Home/Dashboard/CharityDashboard/TransactionHistory";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import Favorites from "../pages/home/Home/Dashboard/UserDashboard/Favorites";
import MyReviews from "../pages/home/Home/Dashboard/UserDashboard/MyReviews";
import MyProfile from "../pages/home/Home/Dashboard/UserDashboard/MyProfile";
import AboutPage from "../components/AboutPage";
import ContactUsPage from "../components/ContactUsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "all-donations",
        element: (
          <PrivateRoute>
            <AllDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "about-us",
        Component: AboutPage,
      },
      {
        path: "contact-us",
        Component: ContactUsPage,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // Common for all roles
      { index: true, element: <DashboardHome /> },

      // User Routes
      { path: "my-profile", element: <MyProfile /> },
      { path: "request-charity", element: <RequestCharity /> },
      { path: "charity-transactions", element: <TransactionHistory /> },
      { path: "favorites", element: <Favorites /> },
      { path: "my-reviews", element: <MyReviews /> },

      // Charity Routes
      { path: "charity-profile", element: <CharityProfile /> },
      { path: "my-requests", element: <MyRequests /> },
      { path: "my-pickups", element: <MyPickups /> },
      { path: "received-donations", element: <ReceivedDonations /> },

      // Restaurant Routes
      { path: "restaurant-profile", element: <RestaurantProfile /> },
      { path: "add-donation", element: <AddDonation /> },
      { path: "my-donations", element: <MyDonations /> },
      { path: "edit-donation/:id", element: <UpdateDonationForm /> },
      { path: "requested-donations", element: <RequestedDonations /> },

      // Admin Routes
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "manage-users", element: <AdminManageUsers /> },
      { path: "manage-donations", element: <AdminManageDonations /> },
      { path: "manage-role-requests", element: <ManageRoleRequests /> },
      { path: "manage-requests", element: <ManageRequests /> },
      { path: "feature-donations", element: <FeatureDonations /> },
    ],
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
  {
    path: "*",
    Component: NotFound,
  },
]);
