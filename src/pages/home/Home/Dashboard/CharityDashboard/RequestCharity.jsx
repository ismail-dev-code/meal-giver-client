import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    mission: "",
  });
  const [existingStatus, setExistingStatus] = useState(null);

  // Fetch existing request status
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/charity-role-transactions?email=${user.email}`)
        .then((res) => {
          if (res.data?.length) {
            const latest = res.data[0]; 
            if (["Pending", "Approved"].includes(latest.status)) {
              setExistingStatus(latest.status);
            }
          }
        });
    }
  }, [user?.email, axiosSecure]);

  // Create payment intent
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { amount: 25 }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  // Handle Stripe payment and request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      const payload = {
        name: user.displayName,
        email: user.email,
        organization: formData.organization,
        mission: formData.mission,
        transactionId,
        amount: 25,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      axiosSecure.post("/charity-role-request", payload)
        .then(() => {
          setFormData({ organization: "", mission: "" });

          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your charity role request has been submitted.",
            confirmButtonText: "Go to Transactions",
          }).then(() => {
            navigate("/dashboard/charity-transactions");
          });
        })
        .catch(err => {
          toast.error(err.response?.data?.message || "Request failed.");
        })
        .finally(() => setProcessing(false));
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded space-y-4">
      <h2 className="text-xl font-semibold mb-4">Request Charity Role</h2>

      {existingStatus ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded text-center">
          You already submitted a request. Please wait for admin approval.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={user.displayName} readOnly className="w-full input input-bordered" />
          <input type="email" value={user.email} readOnly className="w-full input input-bordered" />
          <input
            type="text"
            placeholder="Organization Name"
            required
            className="w-full input input-bordered"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          />
          <textarea
            placeholder="Mission Statement"
            required
            className="w-full textarea textarea-bordered"
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
          ></textarea>

          <p className="text-gray-600 font-medium">Amount: $25.00</p>

          <div className="border p-3 rounded">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="btn btn-primary w-full"
          >
            {processing ? "Processing..." : "Pay & Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

const RequestCharity = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default RequestCharity;
