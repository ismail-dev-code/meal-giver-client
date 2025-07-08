
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const ReviewSection = ({ donationId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const { data: reviews = [], isLoading } = useQuery(
    ["reviews", donationId],
    async () => {
      const res = await axiosSecure.get(`/donations/${donationId}/reviews`);
      return res.data;
    }
  );

  const addReview = useMutation(
    () =>
      axiosSecure.post(`/donations/${donationId}/reviews`, {
        reviewer: user.displayName || user.email,
        text: reviewText,
        rating,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", donationId]);
        setShowForm(false);
        setReviewText("");
        setRating(5);
      },
    }
  );

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <div className="space-y-4 mt-4">
        {reviews.map((r) => (
          <div key={r._id} className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">{r.reviewer}:</p>
            <p>{r.text}</p>
            <p className="text-sm text-gray-500">Rating: {r.rating}/5</p>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="mt-4 space-y-2">
          <textarea
            rows="3"
            className="textarea textarea-bordered w-full"
            placeholder="Write review..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <label>Rating:</label>
            <select
              value={rating}
              onChange={e => setRating(+e.target.value)}
              className="input input-bordered w-20"
            >
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => addReview.mutate()}
            className="btn btn-primary"
            disabled={addReview.isLoading}
          >
            {addReview.isLoading ? "Saving..." : "Add Review"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-outline mt-4"
        >
          Add Review
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
