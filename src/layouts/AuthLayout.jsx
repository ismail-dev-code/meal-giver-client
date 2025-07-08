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
    <div className="w-9/12 max-w-6xl mx-auto pt-10 px-2">
      {/* Logo */}
      <Link to="/" className="block mb-4">
        <MealGiverLogo />
      </Link>

      <div className="flex flex-col-reverse lg:flex-row items-center overflow-hidden">
        {/* Lottie Animation (left on large, bottom on small) */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex justify-center items-center">
          <Lottie animationData={authLottie} loop className="w-full max-w-sm" />
        </div>

        {/* Form Outlet (right on large, top on small) */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
