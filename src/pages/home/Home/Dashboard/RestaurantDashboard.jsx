import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaUtensils,
  FaCheckCircle,
  FaHourglassHalf,
  FaHandHoldingHeart,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";


const COLORS = {
  available: "#34D399",
  requested: "#FBBF24",
  picked_up: "#60A5FA",
  expired: "#F87171",
};

const statusIcons = {
  available: <FaUtensils className="text-4xl text-success" />,
  requested: <FaHourglassHalf className="text-4xl text-warning" />,
  picked_up: <FaCheckCircle className="text-4xl text-info" />,
  expired: <FaHandHoldingHeart className="text-4xl text-error" />,
};

const statusLabels = {
  available: "Available",
  requested: "Requested",
  picked_up: "Picked Up",
  expired: "Expired",
};

const RestaurantDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: donationStatus = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurantDonationStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/restaurant/status-count?email=${user.email}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const pieData = donationStatus.map((item) => ({
    name: statusLabels[item.status] || item.status,
    value: item.count,
    status: item.status,
  }));

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading data: {error.message}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Donation Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {donationStatus.map(({ count, status }) => (
          <div
            key={status}
            className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
          >
            {statusIcons[status] || <FaUtensils className="text-4xl" />}
            <h2 className="text-lg font-semibold mt-3 text-center">
              {statusLabels[status] || status}
            </h2>
            <p className="text-4xl font-extrabold text-primary mt-2">{count}</p>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Donation Status Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {pieData.map((entry) => (
                <Cell
                  key={`cell-${entry.status}`}
                  fill={COLORS[entry.status] || "#A78BFA"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
