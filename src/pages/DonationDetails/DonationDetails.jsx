import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

import RequestDonationModal from "../../components/Modal/RequestDonationModal";
import ReviewModal from "../../components/Modal/ReviewModal";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/MealGiver/Loading";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { role, isLoading: roleLoading } = useUserRole();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    data: donation,
    isLoading: donationLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["donationReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleSaveToFavorites = async () => {
    try {
      await axiosSecure.post("/favorites", {
        email: user?.email,
        donationId: id,
      });
      toast.success("Saved to Favorites!");
    } catch (err) {
      console.log(err);
      toast.error("Already in Favorites or Failed to save.");
    }
  };

  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/charity/pickup-confirm/${donation?.requestId}`);
      toast.success("Pickup confirmed!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to confirm pickup");
    }
  };

  if (donationLoading || roleLoading) {
    return <Loading/>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={donation?.image}
          alt={donation?.title}
          className="rounded-md mb-4 max-h-64 object-cover w-full"
        />
        <h2 className="text-2xl font-semibold mb-2">{donation?.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Type:</strong> {donation?.type}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Quantity:</strong> {donation?.quantity}
        </p>
       
        <p className="text-gray-700 mb-2">
          <strong>Restaurant:</strong> {donation?.restaurant?.name} 
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong>   {donation?.restaurant?.location} </p>
        <p className="text-gray-700 mb-2">
          <strong>Pickup Window:</strong> {donation?.pickupWindow}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Status:</strong> {donation?.status}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3 flex-wrap">
          {(role === "user" || role === "charity") && (
            <button
              onClick={handleSaveToFavorites}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Save to Favorites
            </button>
          )}

          {role === "charity" && donation?.status === "verified" && (
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Request Donation
            </button>
          )}

          {role === "charity" && donation?.status === "accepted" && (
            <button
              onClick={handleConfirmPickup}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirm Pickup
            </button>
          )}

          {(role === "charity" || role === "user") && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add Review
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {reviews.length ? (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-gray-50 p-4 border rounded shadow-sm"
              >
                <p className="font-semibold">{rev.reviewer}</p>
                <p className="text-sm">{rev.comment}</p>
                <p className="text-yellow-500">⭐ {rev.rating}/5</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Modals */}
      {showRequestModal && (
        <RequestDonationModal
          donation={donation}
          onClose={() => setShowRequestModal(false)}
          refetch={refetch}
        />
      )}

    {showReviewModal && (
  <ReviewModal
    donationId={id}
    donation={donation}
    user={user}
    onClose={() => setShowReviewModal(false)}
    refetchReviews={refetchReviews}
  />
)}

    </div>
  );
};

export default DonationDetails;
