import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ReviewModal from "./ReviewModal";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: received = [], isLoading } = useQuery({
    queryKey: ["receivedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity/received-donations");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>MealGiver | Received Donations</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Received Donations</h2>

        {received.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg font-medium">
              You haven’t received any donations yet.
            </p>
            <p className="text-sm">
              Once your requests are accepted by restaurants, the details will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {received.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow border p-4">
                <h3 className="text-xl font-semibold">{item.donationTitle}</h3>
                <p>
                  <strong>Restaurant:</strong> {item.restaurantName}
                </p>
                <p>
                  <strong>Food:</strong> {item.foodType}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Pickup Date:</strong> {item.pickupDate}
                </p>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={() => setSelectedDonation(item)}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedDonation && (
          <ReviewModal
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
          />
        )}
      </div>
    </>
  );
};

export default ReceivedDonations;
