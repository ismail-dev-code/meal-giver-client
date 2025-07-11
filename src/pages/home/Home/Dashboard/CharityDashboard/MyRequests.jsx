import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all requests made by this charity
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/charity");
      return res.data;
    },
  });

  // Cancel request mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["charityRequests"]);
      Swal.fire("Cancelled", "Request has been cancelled.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel request.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your donation request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {requests.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            You have not made any requests yet.
          </p>
        )}

        {requests.map((req) => (
          <div key={req._id} className="card bg-base-100 shadow border p-4">
            <img
              src={req.donation.image}
              alt="Donation"
              className="h-40 object-cover rounded"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-bold">{req.donation.title}</h3>
              <p className="text-sm text-gray-500">
                <strong>Restaurant:</strong> {req.donation.restaurant.name}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {req.donation.type}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Quantity:</strong> {req.donation.quantity}
              </p>
              <p>
                <span
                  className={`badge ${
                    req.status === "pending"
                      ? "badge-warning"
                      : req.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  } capitalize`}
                >
                  {req.status}
                </span>
              </p>

              {req.status === "pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="btn btn-xs btn-outline btn-error mt-2 flex items-center gap-1"
                >
                  <FaTimesCircle /> Cancel Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
