import { useForm } from "react-hook-form";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";


import { useNavigate } from "react-router";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
    },
  });

  const [profilePic, setProfilePic] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_UPLOAD_KEY
    }`;

    try {
      setUploading(true);
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { name, email } = data;

      const res = await axiosSecure.patch("/users/update-profile", {
        email: user?.email,
        newName: name,
        newEmail: email,
        newPhoto: profilePic,
      });

      if (res.data.modifiedCount > 0) {
        await updateProfile({ displayName: name, photoURL: profilePic });
        toast.success("Profile updated successfully!");
        navigate("/dashboard");
      } else {
        toast.info("No changes made.");
      }
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

  return (
    <div className="card max-w-md mx-auto px-4 py-6 bg-base-100 shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}

        <label className="label mt-2">Email</label>
        <input
        readOnly
          type="email"
          {...register("email", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <label className="label mt-2">Profile Picture</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full"
        />
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full mt-2 border"
          />
        )}

        <button
          type="submit"
          className="btn btn-primary text-black mt-4 w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;