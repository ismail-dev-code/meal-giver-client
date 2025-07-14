import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import "aos/dist/aos.css";

import RequestDonationModal from "../../components/Modal/RequestDonationModal";
import ReviewModal from "../../components/Modal/ReviewModal";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/MealGiver/Loading";
import { Helmet } from "react-helmet-async";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Donation Details</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-10 font-montserrat">
        {/* Main container */}
        <div className="p-6 rounded-lg flex flex-col md:flex-row gap-8">
          {/* Image container */}
          <div
            data-aos="fade-right"
            className="flex-shrink-0 md:w-96 w-full rounded-md overflow-hidden shadow-sm"
          >
            <img
              src={donation?.image}
              alt={donation?.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Content container */}
          <div data-aos="fade-left" className="flex flex-col flex-grow">
            <h2 className="text-3xl font-semibold mb-4">{donation?.title}</h2>

            <div className="space-y-2 text-gray-700 text-base">
              <p>
                <strong>Type:</strong> {donation?.type}
              </p>
              <p>
                <strong>Quantity:</strong> {donation?.quantity}
              </p>
              <p>
                <strong>Restaurant:</strong> {donation?.restaurant?.name}
              </p>
              <p>
                <strong>Location:</strong> {donation?.restaurant?.location}
              </p>
              <p>
                <strong>Pickup Window:</strong> {donation?.pickupWindow}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize font-medium ${
                    donation?.status === "available"
                      ? "text-green-600"
                      : donation?.status === "requested"
                      ? "text-yellow-600"
                      : donation?.status === "picked_up"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {donation?.status}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {(role === "user" || role === "charity") && (
                <button
                  onClick={handleSaveToFavorites}
                  className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
                >
                  Save to Favorites
                </button>
              )}

              {role === "charity" && donation?.status === "verified" && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded transition"
                >
                  Request Donation
                </button>
              )}

              {role === "charity" && donation?.status === "accepted" && (
                <button
                  onClick={handleConfirmPickup}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition"
                >
                  Confirm Pickup
                </button>
              )}

              {(role === "charity" || role === "user") && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white px-6 py-2 rounded transition"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Reviews</h3>
          {reviews.length ? (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="p-5 rounded shadow-sm">
                  <p className="font-semibold">{rev.reviewer}</p>
                  <p className="text-gray-700">{rev.comment}</p>
                  <p className="text-yellow-500 mt-1">⭐ {rev.rating}/5</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
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
    </>
  );
};

export default DonationDetails;
