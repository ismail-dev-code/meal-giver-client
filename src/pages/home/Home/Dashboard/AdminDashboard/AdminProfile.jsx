import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import Loading from "../../../../../components/MealGiver/Loading";
import { Helmet } from "react-helmet-async";

const AdminProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: profile = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/email/${user.email}`);
      return res.data;
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-red-600">
        Failed to load admin profile:{" "}
        {error?.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Admin Profile</title>
      </Helmet>
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.photo || user?.photoURL || "/avatar.png"}
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
             Joined:{" "}
              {new Date(profile.last_log_in).toLocaleString("en-US", {
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
    </>
  );
};

export default AdminProfile;
