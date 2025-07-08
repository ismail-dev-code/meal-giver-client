import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";

import toast from "react-hot-toast";
import useAuth from "../../../../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back to MealGiver!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email for password reset.");
      return;
    }
    try {
      setResetLoading(true);
      await resetPassword(resetEmail);
      toast.success("Password reset email sent. Please check your inbox.");
      setForgotMode(false);
      setResetEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div data-aos="fade-up" className="card max-w-md mx-auto md:px-4 py-6 md:shadow-md bg-white">
      <h2 className="md:text-2xl font-bold text-center mb-4 text-primary">
        {forgotMode ? "Reset Your Password" : "Access your account"}
      </h2>

      {!forgotMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Email */}
          <div>
            <label className="label font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`input input-bordered w-full pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-lg text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="link link-hover text-sm"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary text-white w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link
              state={{ from }}
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            Enter your email and we’ll send a link to reset your password.
          </p>

          <div>
            <label
              className="label text-sm font-medium text-gray-700"
              htmlFor="resetEmail"
            >
              Email Address
            </label>
            <input
              id="resetEmail"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              onClick={handleResetPassword}
              disabled={resetLoading}
              className="btn btn-primary text-white w-full sm:w-auto"
            >
              {resetLoading ? "Sending..." : "Send Reset Email"}
            </button>
            <button
              onClick={() => setForgotMode(false)}
              disabled={resetLoading}
              className="btn btn-outline w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Social Login */}
      <div className="md:mt-2">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
