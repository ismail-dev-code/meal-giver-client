import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/restaurant");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ requestId, donationId, action }) => {
      const res = await axiosSecure.patch(`/requests/${requestId}`, {
        action,
        donationId,
      });
      return res.data;
    },
    onSuccess: (data, { action }) => {
      toast.success(`Request ${action === "accept" ? "accepted" : "rejected"}`);
      queryClient.invalidateQueries(["restaurantRequests"]);
    },
    onError: () => {
      toast.error("Failed to update request");
    },
  });

  const handleAction = (requestId, donationId, action) => {
    mutation.mutate({ requestId, donationId, action });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading requests...</div>;
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Requested Donations</title>
      </Helmet>
      <div className="overflow-x-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donation.title}</td>
                <td>{req.donation.type}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.pickupTime}</td>
                <td className="capitalize">{req.status}</td>
                <td>
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAction(req._id, req.donationId, "accept")
                        }
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req._id, req.donationId, "reject")
                        }
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestedDonations;
