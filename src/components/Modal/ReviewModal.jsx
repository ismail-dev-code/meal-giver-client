import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ donationId, user, onClose, refetchReviews }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const review = {
        donationId,
        restaurantEmail: data.restaurantEmail, // If you want to include this
        charityEmail: user.email,
        reviewer: user.displayName || user.email,
        comment: data.comment,
        rating: parseInt(data.rating),
      };

      await axiosSecure.post("/charity/submit-review", review);
      toast.success("Review submitted successfully");
      reset();
      refetchReviews();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            Submit a Review
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={user?.displayName || user?.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                {...register("comment", { required: true })}
                className="textarea textarea-bordered w-full"
                rows={3}
              />
              {errors.comment && <p className="text-red-500 text-sm">Comment is required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Rating</label>
              <select
                {...register("rating", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              {errors.rating && <p className="text-red-500 text-sm">Rating is required</p>}
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
