import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";


const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all charity role requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charityRoleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests/charity");
      return res.data;
    },
  });

  // Mutation to update role request status and assign role if approved
  const mutation = useMutation({
    mutationFn: async ({ id, email, status }) => {
      // Update the role request status first
      await axiosSecure.patch(`/role-requests/${id}`, { status });

      // If approved, update user role to 'charity'
      if (status === "approved") {
        await axiosSecure.patch(`/users/${email}/role`, { role: "charity" });
      }

      return { id, status };
    },
    onSuccess: ({ status }) => {
      queryClient.invalidateQueries(["charityRoleRequests"]);
      Swal.fire(
        "Success!",
        `Role request ${status === "approved" ? "approved" : "rejected"} successfully`,
        "success"
      );
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update role request", "error");
    },
  });

  const handleAction = (id, email, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${status} this role request.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, email, status });
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
      <h2 className="text-2xl font-bold mb-4">Manage Charity Role Requests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id}>
                <td>{idx + 1}</td>
                <td>{req.email}</td> {/* If you have name, replace this */}
                <td>{req.email}</td>
                <td>{req.organizationName}</td>
                <td className="max-w-xs truncate">{req.mission}</td>
                <td>{req.transactionId}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "approved"
                        ? "badge-success"
                        : req.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    } capitalize`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-xs btn-success flex items-center gap-1"
                        onClick={() => handleAction(req._id, req.email, "approved")}
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        className="btn btn-xs btn-error flex items-center gap-1"
                        onClick={() => handleAction(req._id, req.email, "rejected")}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">No action</span>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No charity role requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;
