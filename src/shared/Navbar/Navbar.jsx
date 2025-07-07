import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaHome, FaHandsHelping, FaTachometerAlt } from "react-icons/fa";
import MealGiverLogo from "../../components/MealGiver/MealGiverLogo";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="mr-4 flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-donations" className="mr-4 flex items-center gap-2">
          <FaHandsHelping /> All Donations
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="mr-4 flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow-sm bg-secondary text-white">
      <div className="navbar md:w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="btn btn-ghost lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {showMenu && (
              <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow z-[1]">
                {navItems}
              </ul>
            )}
          </div>
          <Link to="/" className="text-xl flex items-center gap-2">
            <MealGiverLogo />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn bg-accent text-white btn-sm rounded-full px-6 hover:bg-orange-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
