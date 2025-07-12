import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch favorite donation records by user email
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      const favoriteList = res.data;

      // Fetch details of all favorite donationIds in parallel
      const donationDetails = await Promise.all(
        favoriteList.map(async (fav) => {
          try {
            const res = await axiosSecure.get(`/donations/${fav.donationId}`);
            return {
              ...fav,
              donation: res.data,
            };
          } catch {
            return { ...fav, donation: null };
          }
        })
      );

      return donationDetails;
    },
    enabled: !!user?.email,
  });

  // Delete favorite entry
  const removeFavorite = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      toast.success("Removed from favorites");
    },
    onError: () => {
      toast.error("Failed to remove from favorites");
    },
  });

  const handleRemove = (id) => {
    removeFavorite.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Favorite Donations</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav._id} className="card bg-base-100 shadow border">
              <img
                src={fav.donation?.image || "/placeholder.jpg"}
                alt={fav.donation?.title}
                className="h-48 object-cover w-full rounded-t"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{fav.donation?.title}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Restaurant:</strong> {fav.donation?.restaurant?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {fav.donation?.restaurant?.location || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      fav.donation?.status === "verified"
                        ? "badge-info"
                        : fav.donation?.status === "accepted"
                        ? "badge-success"
                        : "badge-warning"
                    } capitalize`}
                  >
                    {fav.donation?.status || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {fav.donation?.quantity || "N/A"}
                </p>

                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/donation-details/${fav.donation?._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    <FaExternalLinkAlt /> Details
                  </Link>
                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
