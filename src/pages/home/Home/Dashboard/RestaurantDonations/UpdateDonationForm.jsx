import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useImageUploader from "../../../../../hooks/useImageLoader";

const UpdateDonationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { uploadImage, uploading } = useImageUploader();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: donation, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (donation) {
      setValue("title", donation.title);
      setValue("type", donation.type);
      setValue("quantity", donation.quantity);
      setValue("pickupWindow", donation.pickupWindow);
      setValue("location", donation.restaurant?.location || "");
    }
  }, [donation, setValue]);

  const onSubmit = async (data) => {
    if (!donation) {
      toast.error("Donation data not loaded yet.");
      return;
    }

    let imageUrl = donation.image;

    if (data.image?.[0]) {
      const uploadedUrl = await uploadImage(data.image[0]);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const updatedData = {
      title: data.title,
      type: data.type,
      quantity: parseInt(data.quantity),
      pickupWindow: data.pickupWindow,
      image: imageUrl,
      "restaurant.location": data.location,
    };

    try {
      const res = await axiosSecure.patch(`/donations/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        toast.success("Donation updated successfully");
        navigate("/dashboard/my-donations");
      } else {
        toast.error("No changes were made");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update donation");
    }
  };

  if (isLoading || !donation) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-600">
        Loading donation details...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Update Donation</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Food Type */}
        <div>
          <label className="block mb-1 font-semibold">Food Type</label>
          <select
            {...register("type", { required: "Type is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select type</option>
            <option value="bakery">Bakery</option>
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="cooked">Cooked Food</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity (kg or portions)</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            className="input input-bordered w-full"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        {/* Pickup Window */}
        <div>
          <label className="block mb-1 font-semibold">Pickup Time Window</label>
          <input
            type="text"
            {...register("pickupWindow", { required: "Pickup window is required" })}
            className="input input-bordered w-full"
          />
          {errors.pickupWindow && <p className="text-red-500 text-sm">{errors.pickupWindow.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Pickup Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Change Image (optional)</label>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          <p className="text-xs text-gray-400 mt-1">Current image will remain if no new image is uploaded.</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Update Donation"}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonationForm;
