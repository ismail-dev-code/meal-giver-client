import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUtensils, FaCheckCircle, FaClock, FaHeart, FaUserAlt, FaHistory } from "react-icons/fa";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

// const statusIcons = {
//   available: <FaUtensils className="text-4xl text-success" />,
//   requested: <FaClock className="text-4xl text-warning" />,
//   picked_up: <FaCheckCircle className="text-4xl text-primary" />,
// };

// const statusLabels = {
//   available: "Available",
//   requested: "Requested",
//   picked_up: "Picked Up",
// };

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

//   const { data: donationStatus = [], isLoading } = useQuery({
//     queryKey: ["donationStatus", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/donations/user/status-count?email=${user.email}`);
//       return res.data;
//     },
//   });

//   const { data: recentDonations = [] } = useQuery({
//     queryKey: ["recentDonations", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/donations/user/recent?email=${user.email}`);
//       return res.data;
//     },
//   });

//   const { data: favorites = [] } = useQuery({
//     queryKey: ["favorites", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/favorites?email=${user.email}`);
//       return res.data;
//     },
//   });

  if ( isUserLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.displayName || user?.email}
      </h1>

      {/* User Info */}
      <div className="card bg-base-100 shadow-md p-6 border border-base-200 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaUserAlt className="text-info" /> Your Info
        </h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p>
          <strong>Last Login:</strong>{" "}
          {userProfile?.last_log_in
            ? moment(userProfile.last_log_in).format("MMMM Do YYYY, h:mm:ss a")
            : "No login info available"}
        </p>
      </div>

      {/* Donation Status Summary */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {donationStatus.map(({ count, status }) => (
          <div
            key={status}
            className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
          >
            {statusIcons[status] || <FaUtensils className="text-4xl" />}
            <h2 className="text-lg font-semibold mt-3 text-center">
              {statusLabels[status] || status}
            </h2>
            <p className="text-4xl font-extrabold text-primary mt-2">{count}</p>
          </div>
        ))}
      </div> */}

      {/* Recent Donations */}
      <div className="card bg-base-100 shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaUtensils /> Recent Donations
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            {/* <tbody>
              {recentDonations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.title}</td>
                  <td>{statusLabels[donation.status]}</td>
                  <td>{donation.quantity}</td>
                  <td>{moment(donation.createdAt).format("LLL")}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>

      {/* Favorite Donations */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaHeart /> Favorite Donations
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Restaurant</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* <tbody>
              {favorites.map((fav) => (
                <tr key={fav._id}>
                  <td>{fav.title}</td>
                  <td>{fav.restaurantName}</td>
                  <td>{statusLabels[fav.status]}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;