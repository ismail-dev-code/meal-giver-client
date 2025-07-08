import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations?approved=true");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading donations...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Donations</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donations.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={d.image}
              alt={d.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{d.title}</h2>
              <p className="text-sm text-gray-600">
                {d.restaurant.name} — {d.restaurant.location}
              </p>
              {d.charity && (
                <p className="text-sm text-gray-600 mt-1">
                  Assigned to: {d.charity.name}
                </p>
              )}
              <p className="text-sm font-medium mt-2">
                Status:{" "}
                <span className={`capitalize ${d.status === "available" ? "text-green-600" : "text-yellow-600"}`}>
                  {d.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">Quantity: {d.quantity}</p>
              <Link
                to={`/donations/${d._id}`}
                className="mt-3 inline-block bg-accent hover:bg-primary text-white px-4 py-2 rounded-full transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
