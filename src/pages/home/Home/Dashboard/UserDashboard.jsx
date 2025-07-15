import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUtensils,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaUserAlt,
  FaStar,
} from "react-icons/fa";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/MealGiver/Loading";

const statusIcons = {
  available: <FaUtensils className="text-4xl text-success" />,
  requested: <FaClock className="text-4xl text-warning" />,
  picked_up: <FaCheckCircle className="text-4xl text-primary" />,
};

const statusLabels = {
  available: "Available",
  requested: "Requested",
  picked_up: "Picked Up",
};

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { data: donationStatus = [] } = useQuery({
    queryKey: ["donationStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations/user/status-count?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: myRecentReviews = [] } = useQuery({
    queryKey: ["myRecentReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data.slice(0, 5);
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      const details = await Promise.all(
        res.data.map(async (fav) => {
          const donation = await axiosSecure.get(
            `/donations/${fav.donationId}`
          );
          return {
            ...donation.data,
            _id: fav._id,
          };
        })
      );
      return details;
    },
  });

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="md:text-3xl text-xl font-bold capitalize text-nowrap mb-6">
        Welcome, {user?.displayName || user?.email}
      </h1>
      {/* User Info */}
      <div className="card bg-base-100 shadow-md p-6 border border-base-200 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <FaUserAlt className="text-info" /> Your Info
        </h2>
        <p className="md:text-xl text-xs">
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      {/* Donation Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
      </div>

      {/* Recent Reviews */}
      <div className="card bg-base-100 shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Recent Reviews
        </h2>
        {myRecentReviews.length === 0 ? (
          <p className="text-gray-500">
            You haven't submitted any reviews yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Donation Title</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Reviewed On</th>
                </tr>
              </thead>
              <tbody>
                {myRecentReviews.map((review) => (
                  <tr key={review._id}>
                    <td>{review.donationTitle || "Untitled"}</td>
                    <td className="text-yellow-500 font-bold">
                      ⭐ {review.rating}
                    </td>
                    <td>{review.comment}</td>
                    <td>{moment(review.createdAt).format("LLL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Favorite Donations */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaHeart className="text-orange-600" /> Favorite Donations
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite donations saved.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Restaurant</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((fav) => (
                  <tr key={fav._id}>
                    <td>{fav.title}</td>
                    <td>{fav.restaurant?.name || "Unknown"}</td>
                    <td>{statusLabels[fav.status] || fav.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
