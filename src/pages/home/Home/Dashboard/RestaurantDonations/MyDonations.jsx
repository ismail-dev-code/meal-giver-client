import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";


const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-donations");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation deleted");
      queryClient.invalidateQueries(["myDonations"]);
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading donations...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Donations</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{donation.title}</h2>
              <p className="text-sm text-gray-500">Type: {donation.type}</p>
              <p className="text-sm text-gray-500">Quantity: {donation.quantity}</p>
              <p className="text-sm text-gray-500">Restaurant: {donation.restaurant.name}</p>
              <p className="text-sm font-medium">
                Status:{" "}
                <span
                  className={`capitalize ${
                    donation.approved ? "text-green-600" : donation.status === "rejected" ? "text-red-500" : "text-yellow-600"
                  }`}
                >
                  {donation.status === "rejected"
                    ? "Rejected"
                    : donation.approved
                    ? "Verified"
                    : "Pending"}
                </span>
              </p>

              <div className="flex gap-2 mt-3">
                {donation.status !== "rejected" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/dashboard/edit-donation/${donation._id}`)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="btn btn-sm btn-error"
                  onClick={() =>
                    window.confirm("Are you sure you want to delete this donation?") &&
                    deleteMutation.mutate(donation._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
