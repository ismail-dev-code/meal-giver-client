import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import SocialLogin from "./Login/SocialLogin";
import useAuth from "../../../../hooks/useAuth";
import useImageUploader from "../../../../hooks/useImageLoader";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const { createUser, updateProfile } = useAuth();
  const { uploadImage, uploading, uploadedUrl } = useImageUploader();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    if (!uploadedUrl) {
      toast.error("Please upload a profile picture before registering.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;

      const userInfo = {
        uid: createdUser.uid,
        email: data.email,
        name: data.name,
        role: "user",
        photo: uploadedUrl,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userInfo);

      await updateProfile({
        displayName: data.name,
        photoURL: uploadedUrl,
      });

      toast.success("Registration successful! Welcome to MealGiver.");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Something went wrong during registration.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>MealGiver | Register</title>
      </Helmet>
      <div
        data-aos="fade-up"
        className="card max-w-md mx-auto px-4 py-6 md:shadow-md bg-white"
      >
        <h1 className="md:text-2xl text-xl text-center font-bold mb-4 text-primary">
          Join MealGiver
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Name */}
          <div>
            <label className="label text-gray-500">Full Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: "Enter at least two words (first and last name)",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="label text-gray-500">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            {uploadedUrl && (
              <img
                src={uploadedUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full mt-2 object-cover border"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-gray-500">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label text-gray-500">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full pr-10 mb-2"
                placeholder="Re-type your password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary text-white w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading image..." : "Register"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>

        {/* Social login */}
        <div className="mb-2">
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Register;
