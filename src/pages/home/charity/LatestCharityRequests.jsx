import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity/latest-requests/recent");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="md:text-3xl font-bold text-secondary text-center mb-10">
          Latest Charity Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No recent requests found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={req.charityLogo || "/default-logo.png"}
                    alt={req.charityName || "Charity"}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {req.charityName || "Unknown Charity"}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {req.description?.slice(0, 120) || "No description available"}...
                </p>
                <p className="text-sm text-primary font-medium">
                  📦 {req.donationTitle || "No Title"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCharityRequests;
