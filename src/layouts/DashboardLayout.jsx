import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaHandsHelping,
  FaEdit,
  FaDonate,
  FaUsers,
  FaUserCheck,
  FaUserShield,
  FaListAlt,
  FaMoneyCheckAlt,
  FaClipboardList,
} from "react-icons/fa";

import useUserRole from "../hooks/useUserRole";
import MealGiverLogo from "../components/MealGiver/MealGiverLogo";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-2 text-base-content">
          <Link to="/" className="mb-4">
            <MealGiverLogo />
          </Link>

          <li>
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <FaHome /> Dashboard Home
            </NavLink>
          </li>

          {/* Role: User */}
          {!roleLoading && role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/edit-profile"
                  className="flex items-center gap-2"
                >
                  <FaEdit /> Edit Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-requests"
                  className="flex items-center gap-2"
                >
                  <FaHandsHelping /> My Requests
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
                  <FaDonate />
                  Restaurant Profile
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
                  to="/dashboard/available-donations"
                  className="flex items-center gap-2"
                >
                  <FaHandsHelping /> Available Donations
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
            </>
          )}

          {/* Role: Admin */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-requests"
                  className="flex items-center gap-2"
                >
                  <FaUserCheck /> Role Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-donations"
                  className="flex items-center gap-2"
                >
                  <FaListAlt /> All Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payments"
                  className="flex items-center gap-2"
                >
                  <FaMoneyCheckAlt /> Payments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/make-admin"
                  className="flex items-center gap-2"
                >
                  <FaUserShield /> Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
