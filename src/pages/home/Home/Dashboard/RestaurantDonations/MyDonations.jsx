import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import ConfirmModal from "../../../../../components/Modal/ConfirmModal";
import { Helmet } from "react-helmet-async";
import Loading from "../../../../../components/MealGiver/Loading";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Fetch my donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-donations");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation deleted");
      queryClient.invalidateQueries(["myDonations"]);
    },
    onError: () => {
      toast.error("Failed to delete donation");
    },
  });

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      deleteMutation.mutate(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  if (isLoading)
    return <Loading/>;

  return (
    <>
      <Helmet>
        <title>MealGiver | My Donations</title>
      </Helmet>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Donations</h1>

        {/* Delete Modal */}
        <ConfirmModal
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this donation?"
        />

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
                <h2 className="text-xl text-gray-900 font-semibold">
                  {donation.title}
                </h2>
                <p className="text-sm text-gray-500">Type: {donation.type}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {donation.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Restaurant: {donation.restaurant?.name}
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  Status:{" "}
                  <span
                    className={`capitalize ${
                      donation.approved
                        ? "text-green-600"
                        : donation.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-600"
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
                      title="Edit Donation"
                      onClick={() =>
                        navigate(`/dashboard/edit-donation/${donation._id}`)
                      }
                      className="btn btn-xs btn-circle btn-primary"
                    >
                      <FaEdit className="text-white text-sm" />
                    </button>
                  )}
                  <button
                    title="Delete Donation"
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-xs btn-circle btn-error"
                  >
                    <FaTrash className="text-white text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyDonations;
