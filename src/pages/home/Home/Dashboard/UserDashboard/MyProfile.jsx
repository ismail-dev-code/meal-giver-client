import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { FaUserCircle } from "react-icons/fa";


const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
     <div className="flex items-center gap-6">
  {userData?.photo ? (
    <img
      src={userData.photo}
      alt={userData?.name}
      className="w-24 h-24 rounded-full object-cover border"
    />
  ) : (
    <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-100">
      <FaUserCircle className="text-gray-400 w-20 h-20" />
    </div>
  )}

  <div>
    <h2 className="text-2xl font-bold">{userData?.name}</h2>
    <p className="text-gray-600">{userData?.email}</p>
    {userData?.phone && <p className="text-gray-600">📞 {userData.phone}</p>}
    {userData?.created_at && (
      <p className="text-gray-500 text-sm">
        Joined: {moment(userData.created_at).format("MMMM D, YYYY")}
      </p>
    )}
  </div>
</div>
    </div>
  );
};

export default MyProfile;
