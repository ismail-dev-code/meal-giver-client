import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import moment from "moment";
import Loading from "../../../../../components/MealGiver/Loading";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (authLoading || isLoading) {
    return <Loading/>
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile: {error?.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <> 
    <Helmet>
        <title>MealGiver | My Profile</title>
      </Helmet>
    <div className="p-6 max-w-4xl mx-auto">
      <div className="card">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              {userData.photo || user?.photoURL ? (
                <img
                  src={userData.photo || user?.photoURL || "/avatar.png"}
                  alt={userData.name || "User Avatar"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserCircle className="text-gray-400 w-full h-full p-4" />
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {userData.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <FaEnvelope /> {userData.email}
            </p>
            {userData.phone && (
              <p className="text-gray-600 mt-1">📞 {userData.phone}</p>
            )}
            {userData.created_at && (
              <p className="text-sm text-gray-400 mt-1">
                Joined: {moment(userData.created_at).format("MMMM D, YYYY")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyProfile;
