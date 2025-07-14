import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["charity-transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-role-transactions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
      <> 
        <Helmet>
            <title>MealGiver | Transaction History</title>
          </Helmet> 
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Charity Role Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Transaction ID</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Organization</th>
                <th className="p-2 border">Mission</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.transactionId}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{tx.transactionId}</td>
                  <td className="p-2 border">${tx.amount}</td>
                  <td className="p-2 border">{tx.date}</td>
                  <td className="p-2 border">{tx.organization}</td>
                  <td className="p-2 border">{tx.mission}</td>
                  <td className="p-2 border">
                    <span
                      className={`badge ${
                        tx.status === "Approved"
                          ? "badge-success"
                          : tx.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default TransactionHistory;
