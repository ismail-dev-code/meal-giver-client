import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";


const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations?approved=true");
      return res.data;
    },
  });

  // Mutation to mark donation as featured
  const mutation = useMutation({
    mutationFn: async (id) => {
      // Assuming the API accepts a patch to update featured status
      return axiosSecure.patch(`/donations/${id}`, { featured: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verifiedDonations"]);
      Swal.fire("Success!", "Donation featured successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to feature donation.", "error");
    },
  });

  const handleFeature = (id) => {
    Swal.fire({
      title: "Feature this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, feature it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
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
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No verified donations found.
                </td>
              </tr>
            )}
            {donations.map((donation, idx) => (
              <tr key={donation._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{donation.title}</td>
                <td>{donation.type}</td>
                <td>{donation.restaurant?.name || "N/A"}</td>
                <td>
                  {donation.featured ? (
                    <span className="text-yellow-500 font-semibold flex items-center gap-1">
                      <FaStar /> Featured
                    </span>
                  ) : (
                    <button
                      className="btn btn-xs btn-primary flex items-center gap-1"
                      onClick={() => handleFeature(donation._id)}
                    >
                      <FaStar /> Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
