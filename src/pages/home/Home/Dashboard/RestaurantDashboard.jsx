import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaUtensils,
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

const RestaurantDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading, isError, error } = useQuery({
    queryKey: ["restaurantStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/restaurant/stats");
      return res.data;
    },
  });

  const pieData = [
    { name: "Approved", value: stats.approved || 0, status: "approved" },
    { name: "Available", value: stats.available || 0, status: "available" },
    { name: "Requested", value: stats.requested || 0, status: "requested" },
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <FaCheckCircle className="text-4xl text-info mx-auto" />
          <h2 className="text-lg font-semibold mt-2">Approved</h2>
          <p className="text-4xl font-bold text-primary">{stats.approved}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <FaUtensils className="text-4xl text-success mx-auto" />
          <h2 className="text-lg font-semibold mt-2">Available</h2>
          <p className="text-4xl font-bold text-primary">{stats.available}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <FaHourglassHalf className="text-4xl text-warning mx-auto" />
          <h2 className="text-lg font-semibold mt-2">Requested</h2>
          <p className="text-4xl font-bold text-primary">{stats.requested}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Donation Breakdown</h2>
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
                  key={entry.name}
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
