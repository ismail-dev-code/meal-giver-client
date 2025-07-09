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



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "all-donations",
        element: <PrivateRoute>
          <AllDonations/>
        </PrivateRoute>
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
    // { path: "my-requests", element: <UserDonationRequests /> },
    // { path: "user-dashboard", element: <UserDashboard /> },

  
    // Charity Routes
    // { path: "charity-dashboard", element: <CharityDashboard /> },
    // { path: "request-history", element: <CharityRequestHistory /> },
    // { path: "requested-donations", element: <CharityRequestedDonations /> },
    // { path: "picked-up-donations", element: <CharityPickedUpDonations /> },
    // { path: "add-review", element: <AddReview /> },

    // Restaurant Routes
    // { path: "restaurant-dashboard", element: <RestaurantDashboard /> },
      { path: "restaurant-profile", element: <RestaurantProfile/>},
    { path: "add-donation", element: <AddDonation /> },
    { path: "my-donations", element: <MyDonations /> },
    { path: "edit-donation/:id", element: <UpdateDonationForm/>}, 
    { path: "requested-donations", element: <RequestedDonations/>}, 


    // Admin Routes
    // { path: "admin-dashboard", element: <AdminDashboard /> },
    // { path: "manage-users", element: <ManageUsers /> },
    // { path: "manage-donations", element: <ManageDonations /> },
    // { path: "role-requests", element: <ManageRoleRequests /> },
    // { path: "all-payments", element: <AllPayments /> },

  
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
  
]);