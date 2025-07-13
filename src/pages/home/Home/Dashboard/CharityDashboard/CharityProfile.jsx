import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaUsers, FaQuoteLeft } from "react-icons/fa";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const CharityProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: profile = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["charityProfile", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity/email/${user.email}`);
      return res.data;
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile: {error?.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profile.photo || user?.photoURL || "/avatar.png"} alt="Charity Logo" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUsers /> {profile.name || "Charity Name"}
            </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <FaEnvelope /> {profile.email}
            </p>
            <p className="mt-2 font-medium badge badge-success badge-outline">
              Role: Charity
            </p>

            {profile.mission && (
              <div className="mt-4 text-gray-700">
                <p className="flex items-center gap-2 text-md font-semibold">
                  <FaQuoteLeft className="text-primary" /> Mission Statement:
                </p>
                <p className="ml-6 italic text-sm mt-1">{profile.mission}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
