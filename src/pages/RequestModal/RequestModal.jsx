
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestModal = ({ donation, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [notes, setNotes] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await axiosSecure.post(`/donations/${donation._id}/requests`, {
      charityEmail: user.email,
      requestDescription: notes,
      pickupTime,
    });
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blur/60 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full p-6 space-y-4 rounded-lg">
        <h2 className="text-lg font-semibold">Request Donation</h2>
        <div className="space-y-2">
          <p><strong>Donation:</strong> {donation.title}</p>
          <p><strong>Restaurant:</strong> {donation.restaurant.name}</p>
          <p><strong>Charity:</strong> {user.displayName || user.email}</p>
        </div>
        <textarea
          rows="3"
          placeholder="Request notes..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="textarea w-full textarea-bordered"
        />
        <input
          type="datetime-local"
          value={pickupTime}
          onChange={e => setPickupTime(e.target.value)}
          className="input input-bordered w-full"
        />
        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
