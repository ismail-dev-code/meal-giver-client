import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all charity requests
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["charityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data;
    },
  });

  // Mutation to delete a request
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/charity-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["charityRequests"]);
      Swal.fire("Deleted!", "Request has been deleted.", "success");
    },
    onError: (err) => {
      const msg = err.response?.data?.message || "Failed to delete request.";
      Swal.fire("Error!", msg, "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
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

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load charity requests.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Requests Manage</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Charity Requests</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200 text-gray-600 uppercase text-xs">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No charity requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr key={req._id}>
                    <td>{idx + 1}</td>
                    <td>{req.donation?.title || "N/A"}</td>
                    <td>{req.charityName}</td>
                    <td>{req.charityEmail}</td>
                    <td className="text-center">
                      <button
                        title="Delete Request"
                        className="btn btn-xs btn-circle btn-error"
                        onClick={() => handleDelete(req._id)}
                      >
                        <FaTrash className="text-white text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageRequests;
