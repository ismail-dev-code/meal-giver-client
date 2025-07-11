import React from "react";
import { Link } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const FeaturedDonationsHome = () => {
  const axiosPublic = useAxios();

  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donations/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="pb-12 pt-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-8">
          Featured Donations
        </h2>

        {featuredDonations.length === 0 ? (
          <p className="text-center text-gray-500">No featured donations yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.slice(0, 4).map((donation) => (
              <div
                key={donation._id}
                className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-md"
              >
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {donation.type}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">
                      {donation.restaurant?.name || "Unknown Restaurant"}
                    </span>{" "}
                    — {donation.restaurant?.location || "Unknown Location"}
                  </p>
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      donation.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {donation.status}
                  </span>
                  <div>
                    <Link
                      to={`/donation-details/${donation._id}`}
                      className="mt-2 inline-block text-sm text-white bg-accent hover:bg-primary px-4 py-2 rounded-full transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDonationsHome;
