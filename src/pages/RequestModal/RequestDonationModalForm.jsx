import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestDonationModalForm = ({ donation, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post(`/donations/${donation._id}/requests`, {
        charityEmail: user.email,
        requestDescription: data.requestDescription,
        pickupTime: data.pickupTime,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Request submitted successfully!");
        refetch();
        reset();
        document.getElementById("request_modal").close();
      }
    } catch (err) {
      toast.error("Failed to submit request");
      console.error(err);
    }
  };

  return (
    <dialog id="request_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Request Donation</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label">Donation Title</label>
            <input
              type="text"
              value={donation.title}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Restaurant</label>
            <input
              type="text"
              value={donation.restaurant?.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Charity</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Request Description</label>
            <textarea
              {...register("requestDescription", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Why are you requesting this donation?"
            ></textarea>
            {errors.requestDescription && (
              <p className="text-red-500 text-sm mt-1">
                Request description is required.
              </p>
            )}
          </div>
          <div>
            <label className="label">Pickup Time</label>
            <input
              type="datetime-local"
              {...register("pickupTime", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.pickupTime && (
              <p className="text-red-500 text-sm mt-1">
                Pickup time is required.
              </p>
            )}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn" onClick={() => document.getElementById("request_modal").close()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModalForm;
