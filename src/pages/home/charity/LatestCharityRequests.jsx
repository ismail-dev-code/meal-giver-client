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

  
  const latestThree = requests.slice(0, 3);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="md:text-3xl text-2xl font-bold text-center mb-10">
          Latest Charity Requests
        </h2>

        {latestThree.length === 0 ? (
          <p className="text-center text-gray-500">No recent requests found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestThree.map((req, index) => (
              <div
                key={req._id}
                className="rounded-lg p-6 shadow bg-white h-[320px] flex flex-col justify-between transition hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={req.charityLogo || "/default-logo.png"}
                      alt={req.charityName || "Charity"}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <h3 className="text-lg capitalize font-semibold text-gray-800">
                      {req.charityName || "Unknown Charity"}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {req.description || "No description available"}
                  </p>
                </div>
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
