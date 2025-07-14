import { Link, NavLink } from "react-router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHome, FaHandsHelping, FaTachometerAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import MealGiverLogo from "../../components/MealGiver/MealGiverLogo";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, logOut } = useAuth();

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
      <div className="navbar w-full md:w-11/12 mx-auto">
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
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-sm btn-ghost btn-circle avatar hover:ring hover:ring-primary/50 transition"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User Profile" />
                  ) : (
                    <div className="bg-gray-300 text-gray-700 w-full h-full flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="mb-1 px-2 text-sm text-gray-500">
                  {user.displayName || user.email}
                </li>
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-red-600 hover:bg-red-100"
                  >
                    🔓 Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-primary text-white btn-sm mr-2 btn-outline btn-primary rounded-full px-6"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn btn-sm hover:bg-primary btn-outline md:flex hidden hover:text-white btn-primary rounded-full px-6"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg text-secondary font-semibold mb-4">
              Confirm Logout
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn text-teal-700 btn-sm btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn text-base-100 btn-sm btn-error"
                onClick={handleLogout}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
