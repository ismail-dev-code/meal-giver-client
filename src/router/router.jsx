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
import RequestCharity from "../pages/home/Home/Dashboard/UserDashboard/RequestCharity";
import NotFound from "../components/NotFound";
import AdminProfile from "../pages/home/Home/Dashboard/AdminDashboard/AdminProfile";
import AdminManageDonations from "../pages/home/Home/Dashboard/AdminDashboard/AdminManageDonations";
import AdminManageUsers from "../pages/home/Home/Dashboard/AdminDashboard/AdminManageUsers";
import ManageRoleRequests from "../pages/home/Home/Dashboard/AdminDashboard/ManageRoleRequests";
import ManageRequests from "../pages/home/Home/Dashboard/AdminDashboard/ManageRequests ";
import FeatureDonations from "../pages/home/Home/Dashboard/AdminDashboard/FeatureDonations ";

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
      // { path: "my-favorites", element: <UserFavorites /> },
      { path: "request-charity", element: <RequestCharity /> },
      // { path: "user-dashboard", element: <UserDashboard /> },

      // Charity Routes
      // { path: "charity-dashboard", element: <CharityDashboard /> },
      // { path: "request-history", element: <CharityRequestHistory /> },
      // { path: "requested-donations", element: <CharityRequestedDonations /> },
      // { path: "picked-up-donations", element: <CharityPickedUpDonations /> },
      // { path: "add-review", element: <AddReview /> },

      // Restaurant Routes
      // { path: "restaurant-dashboard", element: <RestaurantDashboard /> },
      { path: "restaurant-profile", element: <RestaurantProfile /> },
      { path: "add-donation", element: <AddDonation /> },
      { path: "my-donations", element: <MyDonations /> },
      { path: "edit-donation/:id", element: <UpdateDonationForm /> },
      { path: "requested-donations", element: <RequestedDonations /> },

      // Admin Routes
      // { path: "admin-dashboard", element: <AdminDashboard /> },
      {path: 'admin-profile', element: <AdminProfile/>},
      { path: "manage-users", element: <AdminManageUsers/> },
      { path: "manage-donations", element:  <AdminManageDonations/>},
      { path: "manage-role-requests", element: <ManageRoleRequests/>},
      {path: 'manage-requests', element: <ManageRequests/>},
      { path: "feature-donations", element: <FeatureDonations/> },

      // Shared Secure Routes
      // { path: "donation-details/:id", element: <DonationDetails /> },
      // { path: "request-donation/:id", element: <RequestDonationModal /> },
      // { path: "reviews/:id", element: <ReviewsSection /> },
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
