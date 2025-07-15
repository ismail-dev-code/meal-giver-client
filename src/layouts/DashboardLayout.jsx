import React, { useState, Fragment } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaDonate,
  FaUserCheck,
  FaListAlt,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaHeart,
  FaStar,
  FaUsersCog,
  FaUserCircle,
  FaHandshake,
  FaTruck,
  FaReceipt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import useUserRole from "../hooks/useUserRole";
import MealGiverLogo from "../components/MealGiver/MealGiverLogo";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const [showModal, setShowModal] = useState(false);
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Failed to log out");
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>MealGiver | Dashboard</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Top Navbar for Mobile */}
          <div className="w-full navbar bg-secondary lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <Link to={"/"}>
              <MealGiverLogo />
            </Link>
          </div>

          {/* Main Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-secondary space-y-2 text-white">
            <Link to="/" className="mb-4">
              <MealGiverLogo />
            </Link>

            <li>
              <Link to="/dashboard" className="flex items-center gap-2">
                <FaHome /> Dashboard Home
              </Link>
            </li>

            {/* Role: User */}
            {!roleLoading && role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className="flex items-center gap-2"
                  >
                    <FaUser /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/request-charity"
                    className="flex items-center gap-2"
                  >
                    <FaUserCheck /> Request Charity Role
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/favorites"
                    className="flex items-center gap-2"
                  >
                    <FaHeart />My Favorites
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    className="flex items-center gap-2"
                  >
                    <FaStar /> My Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/charity-transactions"
                    className="flex items-center gap-2"
                  >
                    <FaMoneyCheckAlt /> Transaction History
                  </NavLink>
                </li>
              </>
            )}

            {/* Role: Restaurant */}
            {!roleLoading && role === "restaurant" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/restaurant-profile"
                    className="flex items-center gap-2"
                  >
                    <FaDonate /> Restaurant Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-donation"
                    className="flex items-center gap-2"
                  >
                    <FaDonate /> Add Donation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-donations"
                    className="flex items-center gap-2"
                  >
                    <FaListAlt /> My Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/requested-donations"
                    className="flex items-center gap-2"
                  >
                    <FaClipboardList /> Requested Donations
                  </NavLink>
                </li>
              </>
            )}

            {/* Role: Charity */}
            {!roleLoading && role === "charity" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/charity-profile"
                    className="flex items-center gap-2"
                  >
                    <FaUserCircle /> Charity Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-requests"
                    className="flex items-center gap-2"
                  >
                    <FaClipboardList /> My Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-pickups"
                    className="flex items-center gap-2"
                  >
                    <FaTruck /> My Pickups
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/received-donations"
                    className="flex items-center gap-2"
                  >
                    <FaDonate /> Received Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/charity-transactions"
                    className="flex items-center gap-2"
                  >
                    <FaReceipt /> Transaction History
                  </NavLink>
                </li>
              </>
            )}

            {/* Role: Admin */}
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-profile"
                    className="flex items-center gap-2"
                  >
                    <FaUserCircle /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-donations"
                    className="flex items-center gap-2"
                  >
                    <FaListAlt /> Manage Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className="flex items-center gap-2"
                  >
                    <FaUsersCog /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-role-requests"
                    className="flex items-center gap-2"
                  >
                    <FaUserCheck /> Manage Role Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-requests"
                    className="flex items-center gap-2"
                  >
                    <FaHandshake /> Manage Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/feature-donations"
                    className="flex items-center gap-2"
                  >
                    <FaStar /> Feature Donations
                  </NavLink>
                </li>
              </>
            )}

            {/* Logout */}
            <li className="border-t-1 border-gray-300 md:mt-44">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </li>
          </ul>
        </div>

        {/* Logout Confirmation Modal */}
        <Transition appear show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setShowModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-secondary/10 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm Logout
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to log out of your MealGiver
                        account?
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-gray-700 border cursor-pointer border-gray-300 rounded hover:bg-gray-100"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 cursor-pointer text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default DashboardLayout;
