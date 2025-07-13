import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "../../../../../hooks/useAuth";
import { useNavigate } from "react-router";

const ReviewModal = ({ donation, onClose, refetchReviews }) => {
  console.log(donation);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide both a rating and a comment.");
      return;
    }

    setLoading(true);

    const review = {
      donationId: donation._id,
      donationTitle: donation?.title || donation?.donationTitle || "Untitled",
      restaurantEmail:
        donation?.restaurantEmail || donation?.restaurant?.email || "",
      restaurantName:
        donation?.restaurant?.name || donation?.restaurantName || "Unknown",
      charityEmail: donation?.charityEmail || user?.email,
      userEmail: user?.email,
      reviewer: user?.displayName || "Anonymous",
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);

      if (res.data?.insertedId || res.data?.acknowledged) {
        toast.success("Review submitted successfully.");
        await refetchReviews?.(); // Make sure reviews are reloaded
        onClose(); // Close modal
        navigate(`/donation-details/${donation._id}`); // Redirect back to details
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong while submitting the review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Review Donation</h2>

        <p className="mb-3 text-gray-700 text-sm">
          Reviewing:{" "}
          <span className="font-semibold">
            {donation?.title || donation?.donationTitle || "Untitled Donation"}
          </span>{" "}
          from{" "}
          <span className="italic">
            {donation?.restaurant?.name || donation?.restaurantName || "Unknown"}
          </span>
        </p>

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => {
            const index = i + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar
                  className={`text-2xl ${
                    index <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Comment */}
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Write your feedback here..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
