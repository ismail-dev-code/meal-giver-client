// src/pages/donations/DonationDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import RequestModal from "../../components/donations/RequestModal";
import ReviewSection from "../../components/donations/ReviewSection";
import useAuth from "../../hooks/useAuth";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: donation, isLoading } = useQuery(
    ["donation", id],
    async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    }
  );

  const saveFavMutation = useMutation(
    () =>
      axiosSecure.post(`/users/${user.email}/favorites`, {
        donationId: id,
      }),
    {
      onSuccess: () => {
        alert("Saved to Favorites!");
        queryClient.invalidateQueries(["donation", id]);
      },
    }
  );

  if (isLoading) return <div>Loading donation...</div>;

  const {
    title,
    description,
    restaurant,
    pickupWindow,
    status,
    image,
    quantity,
    charity,
  } = donation;

  const isCharity = user?.role === "charity";
  const canRequest = status === "available" && isCharity;
  const isAssigned = charity?.email === user?.email;
  const canConfirm = status === "accepted" && isAssigned;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <img src={image} alt={title} className="w-full h-80 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>
      <ul className="space-y-1">
        <li><strong>Restaurant:</strong> {restaurant.name} — {restaurant.location}</li>
        <li><strong>Pickup Window:</strong> {pickupWindow}</li>
        <li><strong>Status:</strong> {status}</li>
        <li><strong>Quantity:</strong> {quantity}</li>
      </ul>

      <div className="flex gap-4">
        <button
          onClick={() => saveFavMutation.mutate()}
          disabled={saveFavMutation.isLoading}
          className="btn bg-primary text-white px-4 py-2 rounded-full"
        >
          {saveFavMutation.isLoading ? "Saving…" : "Save to Favorites"}
        </button>

        {canRequest && (
          <button
            onClick={() => setShowRequestModal(true)}
            className="btn bg-accent text-white px-4 py-2 rounded-full"
          >
            Request Donation
          </button>
        )}

        {canConfirm && (
          <button
            onClick={() => axiosSecure.patch(`/donations/${id}/confirm-pickup`)}
            className="btn bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Confirm Pickup
          </button>
        )}
      </div>

      {showRequestModal && (
        <RequestModal
          donation={donation}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      <ReviewSection donationId={id} />
    </div>
  );
};

export default DonationDetails;
