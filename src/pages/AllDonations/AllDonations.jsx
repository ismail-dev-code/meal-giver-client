import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/MealGiver/Loading";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const filteredDonations = donations
    .filter((d) =>
      d?.restaurant?.location
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "quantity-asc") return a.quantity - b.quantity;
      if (sortOption === "quantity-desc") return b.quantity - a.quantity;
      if (sortOption === "pickup-asc")
        return new Date(a.pickupTime) - new Date(b.pickupTime);
      if (sortOption === "pickup-desc")
        return new Date(b.pickupTime) - new Date(a.pickupTime);
      return 0;
    });

  if (isLoading)
    return <Loading/>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Donations</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by location..."
          className="input input-bordered w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">Sort by</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
          <option value="pickup-asc">Pickup Time (Earliest)</option>
          <option value="pickup-desc">Pickup Time (Latest)</option>
        </select>
      </div>

      {/* Donation Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredDonations.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            {d.featured && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Featured
              </span>
            )}

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
                <span
                  className={`capitalize ${
                    d.status === "available"
                      ? "text-green-600"
                      : d.status === "requested"
                      ? "text-yellow-600"
                      : d.status === "picked_up"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {d.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">Quantity: {d.quantity}</p>
              <p className="text-sm mt-1">
                <strong>Approved:</strong>{" "}
                <span className={d.approved ? "text-green-500" : "text-red-500"}>
                  {d.approved ? "Yes" : "No"}
                </span>
              </p>
              <Link
                to={`/donation-details/${d._id}`}
                className="mt-3 inline-block bg-accent hover:bg-primary text-white px-4 py-2 rounded-full transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No donations match your search or filter.
        </p>
      )}
    </div>
  );
};

export default AllDonations;
