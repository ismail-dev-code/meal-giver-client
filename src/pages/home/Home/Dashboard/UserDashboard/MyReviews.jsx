import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch reviews submitted by the current user
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete a review
  const deleteReview = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });

  const handleDelete = (id) => {
    deleteReview.mutate(id);
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
        <title>MealGiver | My Reviews</title>
      </Helmet> 
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t written any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card max-w-sm bg-base-100 shadow p-4 space-y-2"
            >
              <h3 className="text-lg font-semibold">{review.donationTitle || "Untitled Donation"}</h3>
              <p className="text-sm text-gray-600">
                <strong>Restaurant:</strong> {review.restaurantName || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Reviewed on:</strong>{" "}
                {moment(review.createdAt).format("MMMM D, YYYY h:mm A")}
              </p>
              <p className="text-gray-700">{review.comment}</p>

              <div>
                <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm btn-error mt-2 text-white"
              >
                <FaTrash /> Delete Review
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MyReviews;
