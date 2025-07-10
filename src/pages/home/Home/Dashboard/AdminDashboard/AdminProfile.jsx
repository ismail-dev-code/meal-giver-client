import { useEffect, useState } from "react";

import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";



const AdminProfile = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/profile?email=${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          console.error("Failed to load admin profile:", err);
        });
    }
  }, [user, axiosSecure]);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.photoURL || "/avatar.png"}
          alt="Admin"
          className="w-28 h-28 rounded-full border-4 border-primary object-cover"
        />
        <h2 className="text-2xl font-bold mt-4">{profile.name || "N/A"}</h2>
        <p className="text-gray-600 text-sm mb-1">{profile.email}</p>
        <p className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
          Role: {profile.role || "user"}
        </p>
        {profile.last_log_in && (
        <p className="text-sm text-gray-500 mt-2">
  Last Login: {new Date(profile.last_log_in).toLocaleString("en-US", {
    hour12: true,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })}
</p>

        )}
      </div>
    </div>
  );
};

export default AdminProfile;
