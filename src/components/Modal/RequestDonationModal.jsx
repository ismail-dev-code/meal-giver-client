import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestDonationModal = ({ donation, onClose, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    const payload = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantId: donation.restaurant._id,
      restaurantName: donation.restaurant.name,
      restaurantEmail: donation.restaurant.email,
      charityEmail: user.email,
      charityName: user.displayName,
      requestDescription: data.requestDescription,
      pickupTime: data.pickupTime,
    };



    const res = await axiosSecure.post(`/donations/${donation._id}/requests`, payload);

    if (res.data.insertedId) {
      toast.success("Donation request submitted");
      refetch();
      reset();
      onClose();
    } else {
      toast.error("Failed to submit request");
    }
  } catch (err) {
    console.error(" Error response:", err.response?.data);
    toast.error(err?.response?.data?.message || "Failed to request donation");
  }
};


  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white text-gray-600 rounded-lg p-6 max-w-md w-full space-y-4">
          <Dialog.Title className="text-lg font-semibold">Request Donation</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Donation Title</label>
              <input
                type="text"
                value={donation.title}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Restaurant Name</label>
              <input
                type="text"
                value={donation.restaurant?.name}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Charity Name</label>
              <input
                type="text"
                value={user?.displayName}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Charity Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Request Description</label>
              <textarea
                {...register("requestDescription", { required: true })}
                className="textarea textarea-bordered w-full"
                rows={3}
              />
              {errors.requestDescription && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Pickup Time</label>
              <input
                type="datetime-local"
                {...register("pickupTime", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.pickupTime && (
                <p className="text-red-500 text-sm">Pickup time is required</p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RequestDonationModal;
