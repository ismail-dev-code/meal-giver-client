import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const RequestCharity = () => {
  const { user } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fixedAmount = 25;

  // Check if user already has a pending/approved request
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/role-request-status?email=${user.email}`)
        .then((res) => {
          if (res.data?.status === "pending" || res.data?.status === "approved") {
            setHasPendingRequest(true);
          }
        });
    }
  }, [user, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const payload = {
      organizationName: orgName,
      mission,
      transactionId: "test_txn_id_placeholder", // You can replace this later when integrating Stripe
      amount: fixedAmount,
    };

    axiosSecure
      .post("/charity-role-request", payload)
      .then(() => {
        toast.success("Charity role request submitted!");
        setOrgName("");
        setMission("");
        setHasPendingRequest(true);
      })
      .catch(() => toast.error("Failed to submit charity role request."));

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Request Charity Role</h2>
      {hasPendingRequest ? (
        <p className="text-yellow-600 font-medium text-center">
          You already have a pending or approved charity role request.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="font-medium">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="font-medium">Mission Statement</label>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              required
              rows={4}
              className="w-full border px-3 py-2 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded font-semibold"
          >
            {isLoading ? "Submitting..." : `Submit with $${fixedAmount} Payment`}
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestCharity;
