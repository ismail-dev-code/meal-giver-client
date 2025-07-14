import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/MealGiver/Loading";

const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["myPickups"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity/my-pickups");
      return res.data;
    },
  });

  const confirmPickup = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.patch(`/charity/pickup-confirm/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPickups"]);
      Swal.fire("Confirmed!", "Pickup confirmed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not confirm pickup.", "error");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Pickups</h2>

      {pickups.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          
          <h3 className="text-lg font-medium mb-2">No pickups available</h3>
          <p>You haven’t confirmed any food pickups yet. Once a restaurant approves your donation request, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pickups.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow border p-4">
              <h3 className="text-xl font-semibold">{item.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {item.restaurantName} ({item.location})</p>
              <p><strong>Food:</strong> {item.foodType}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Pickup Time:</strong> {item.pickupTime}</p>
              <p><strong>Status:</strong> {item.status}</p>
              {item.status !== "picked_up" && (
                <button
                  onClick={() => confirmPickup.mutate(item._id)}
                  className="btn btn-success mt-3 btn-sm"
                >
                  Confirm Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
