import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ReviewModal = ({ donation, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        donationId: donation._id,
        donationTitle: donation.donationTitle,
        restaurantEmail: donation.restaurantEmail,
        charityEmail: donation.charityEmail,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/charity/submit-review", reviewData);
      toast.success("Review submitted!");
      onClose();
    } catch (error) {
      console.error("Review submit error:", error);
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Review Donation</h2>
        <p className="mb-2 text-gray-700">
          <strong>{donation?.donationTitle}</strong> from{" "}
          <span className="italic">{donation?.restaurantName}</span>
        </p>

        {/* Rating Stars */}
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

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
