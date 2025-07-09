import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["restaurant-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600 font-medium">
        Loading restaurant profile...
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={profile?.photo || "/default-logo.png"}
          alt="Restaurant Logo"
          className="w-24 h-24 rounded-full border object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">{profile?.name}</h2>
        <span className="badge badge-primary mt-1 capitalize">{profile?.role}</span>

        <div className="mt-4 w-full space-y-2 text-center text-sm text-gray-700">
          <p><strong>Email:</strong> {profile?.email}</p>
          {/* Optional if stored in DB */}
          <p><strong>Contact:</strong> {profile?.contact || "+8801XXXXXXXXX"}</p>
          <p><strong>Address:</strong> {profile?.location || "N/A"}</p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(profile?.created_at).toLocaleDateString("en-BD", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
