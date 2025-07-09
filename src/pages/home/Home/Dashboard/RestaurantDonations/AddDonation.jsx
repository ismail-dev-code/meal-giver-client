import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import useImageUploader from "../../../../../hooks/useImageLoader";
import { useNavigate } from "react-router";

const AddDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { uploadImage, uploading } = useImageUploader();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.image[0];

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const imageUrl = await uploadImage(file);
    if (!imageUrl) return;

    const donation = {
      title: data.title,
      type: data.type,
      quantity: data.quantity,
      pickupWindow: data.pickupWindow,
      restaurant: {
        name: user.displayName,
        email: user.email,
        location: data.location,
      },
      image: imageUrl,
      status: "available",
      approved: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/donations", donation);
      if (res.data.insertedId) {
        toast.success("Donation added successfully");
        reset();
        navigate("/dashboard/my-donations");
      } else {
        toast.error("Failed to add donation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit donation");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Donation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Surplus Pastries"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="block mb-1 font-medium">Food Type</label>
          <select
            {...register("type", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select type</option>
            <option value="bakery">Bakery</option>
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="cooked">Cooked Food</option>
            <option value="other">Other</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">Type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">
            Quantity (kg or portions)
          </label>
          <input
            type="number"
            {...register("quantity", { required: true, min: 1 })}
            className="input input-bordered w-full"
            placeholder="e.g. 10"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">Valid quantity required</p>
          )}
        </div>

        {/* Pickup Time Window */}
        <div>
          <label className="block mb-1 font-medium">Pickup Time Window</label>
          <input
            type="text"
            {...register("pickupWindow", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 4:00 PM - 6:00 PM"
          />
          {errors.pickupWindow && (
            <p className="text-red-500 text-sm">Pickup window required</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 123 Main St, City"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">Location required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Readonly Fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Restaurant Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-white"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Donation"}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
