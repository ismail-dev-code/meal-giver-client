import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/MealGiver/Loading";
import { FaCheckCircle } from "react-icons/fa";

const FeaturedDonationsHome = () => {
  const axiosPublic = useAxios();

  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donations/featured");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="pb-12 pt-5">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="md:text-3xl text-2xl font-bold text-center  mb-10">
          Featured Donations
        </h2>

        {featuredDonations.length === 0 ? (
          <p className="text-center text-gray-500">No featured donations yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.slice(0, 4).map((donation, index) => (
              <div
                key={donation._id}
                className="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <div className="relative group overflow-hidden rounded-t-xl">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 text-sm flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {donation.title.length > 45
                      ? `${donation.title.slice(0, 45)}...`
                      : donation.title}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Type:</span> {donation.type}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Quantity:</span> {donation.quantity} KG
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Restaurant:</span>{" "}
                    {donation.restaurant?.name || "Unknown"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    <strong>Location:</strong>{" "}
                    {donation.restaurant?.location || "Unknown"}
                  </p>
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-between rounded-b-xl">
                  <div className="flex items-center gap-2">
                    {donation.verified && (
                      <FaCheckCircle
                        className="text-green-500 text-lg"
                        title="Verified Donation"
                      />
                    )}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        donation.status?.toLowerCase() === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>

                  <Link
                    to={`/donation-details/${donation._id}`}
                    className="text-sm font-medium text-white bg-primary hover:bg-accent transition px-4 py-2 rounded-full hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDonationsHome;
