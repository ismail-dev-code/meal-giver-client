import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["adminAllDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  // Mutation to update donation status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donations/${id}`, {
        status,
        approved: status === "verified",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminAllDonations"]);
      Swal.fire("Success", "Donation status updated!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update donation status.", "error");
    },
  });

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${
        status === "verified" ? "verify" : "reject"
      } this donation.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MealGiver | Manage Donations</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200 text-xs text-gray-600 uppercase">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Restaurant</th>
                <th>Email</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.title}</td>
                  <td>{donation.type}</td>
                  <td>{donation.restaurant?.name}</td>
                  <td>{donation.restaurant?.email}</td>
                  <td>{donation.quantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        donation.status === "verified"
                          ? "badge-success"
                          : donation.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {donation.status === "verified" ||
                    donation.status === "rejected" ? (
                      <span className="text-gray-400 italic">No action</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction(donation._id, "verified")}
                          className="btn btn-xs btn-success"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleAction(donation._id, "rejected")}
                          className="btn btn-xs btn-error"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminManageDonations;
