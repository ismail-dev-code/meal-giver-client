import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ donationId, donation, user, onClose, refetchReviews }) => {
  const axiosSecure = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const comment = form.comment.value;
    const rating = parseInt(form.rating.value);

    const reviewData = {
      donationId,
      reviewer: user?.displayName,
      userEmail: user?.email,
      donationTitle: donation?.title,
      restaurantName: donation?.restaurant?.name,
      comment,
      rating,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success("Review submitted!");
      refetchReviews(); 
      onClose();
    } catch (err) {
      toast.error("Failed to submit review");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center text-gray-900 justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">Submit a Review</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Comment</label>
              <textarea
                name="comment"
                required
                className="w-full text-gray-500 textarea textarea-bordered"
                placeholder="Write your experience..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating (1 to 5)</label>
              <select
                name="rating"
                required
                className="select text-gray-500 select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
