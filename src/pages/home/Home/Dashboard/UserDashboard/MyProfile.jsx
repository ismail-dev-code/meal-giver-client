import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaUserCircle, FaPhone, FaUserTag, FaCalendarAlt, FaIdBadge } from "react-icons/fa";
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
    return <Loading />;
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

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image Card */}
          <div className="card shadow-md bg-base-100 p-6 flex flex-col items-center rounded-xl">
            <div className="avatar mb-4">
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
            <p className="font-semibold text-lg">Profile Image</p>
          </div>

          {/* Name Card */}
          <div className="card shadow-md bg-base-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaIdBadge className="text-primary" /> Name
            </h3>
            <p className="text-gray-600">{userData.name || "User Name"}</p>
          </div>

          {/* Email Card */}
          <div className="card shadow-md bg-base-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaEnvelope className="text-primary" /> Email
            </h3>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          {/* Phone Card */}
          {userData.phone && (
            <div className="card shadow-md bg-base-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaPhone className="text-green-600" /> Phone
              </h3>
              <p className="text-gray-600">{userData.phone}</p>
            </div>
          )}

          {/* Role Card */}
          {userData.role && (
            <div className="card shadow-md bg-base-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaUserTag className="text-indigo-600" /> Role
              </h3>
              <p className="text-gray-600 capitalize">{userData.role}</p>
            </div>
          )}

          {/* Joined Card */}
          {userData.created_at && (
            <div className="card shadow-md bg-base-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-pink-500" /> Joined
              </h3>
              <p className="text-gray-600">
                {moment(userData.created_at).format("MMMM D, YYYY")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
