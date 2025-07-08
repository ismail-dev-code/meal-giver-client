import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import Lottie from "lottie-react";
import authLottie from "../assets/lottie/mealgiver_login.json";
import MealGiverLogo from "../components/MealGiver/MealGiverLogo";

const AuthLayout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto pt-10">
      {/* Logo */}
      <Link to="/" className="block mb-4">
        <MealGiverLogo />
      </Link>

      <div className="hero-content flex-col lg:flex-row-reverse rounded-xl p-6 lg:p-10 bg-white shadow-lg">
        {/* Animation */}
        <div className="flex-1 flex justify-center items-center mb-6 lg:mb-0">
          <Lottie animationData={authLottie} loop className="w-full max-w-md" />
        </div>

        {/* Auth Form Outlet */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
