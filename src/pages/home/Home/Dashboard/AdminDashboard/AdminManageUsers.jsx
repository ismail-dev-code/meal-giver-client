import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUserShield,
  FaUtensils,
  FaHandHoldingHeart,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Update role mutation using email
  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      return await axiosSecure.patch(`/users/${email}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Success!", "User role updated successfully", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update user role", "error");
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Deleted!", "User has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete user", "error");
    },
  });

  // Handle role assignment by email
  const handleRoleChange = (email, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Assign role "${role}" to this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ email, role });
      }
    });
  };

  // Handle user deletion
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
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
    <>
      <Helmet>
        <title>MealGiver | Users Manage</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200 text-gray-600 uppercase text-xs">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="btn btn-xs btn-success flex items-center gap-1"
                      disabled={
                        user.role === "admin" || updateRoleMutation.isLoading
                      }
                      onClick={() => handleRoleChange(user.email, "admin")}
                    >
                      <FaUserShield /> Admin
                    </button>
                    <button
                      className="btn btn-xs btn-warning flex items-center gap-1"
                      disabled={
                        user.role === "restaurant" ||
                        updateRoleMutation.isLoading
                      }
                      onClick={() => handleRoleChange(user.email, "restaurant")}
                    >
                      <FaUtensils /> Restaurant
                    </button>
                    <button
                      className="btn btn-xs btn-info flex items-center gap-1"
                      disabled={
                        user.role === "charity" || updateRoleMutation.isLoading
                      }
                      onClick={() => handleRoleChange(user.email, "charity")}
                    >
                      <FaHandHoldingHeart /> Charity
                    </button>
                    <button
                      className="btn btn-xs btn-error flex items-center gap-1"
                      disabled={deleteUserMutation.isLoading}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminManageUsers;
