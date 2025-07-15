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
        <h2 className="md:text-3xl text-xl font-bold text-center text-secondary mb-4 md:mb-10">
          Featured Donations
        </h2>

        {featuredDonations.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured donations yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.slice(0, 4).map((donation, index) => (
              <div
                key={donation._id}
                className="bg-white shadow rounded-xl overflow-hidden transition hover:shadow-lg border border-gray-100"
                data-aos-delay={index * 100}
              >
                <div className="relative group">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-44 object-cover transition duration-300 ease-in-out group-hover:scale-105"
                  />
                  {donation.verified && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                      <FaCheckCircle
                        className="text-green-500 text-xl"
                        title="Verified Donation"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {donation.type}
                  </h3>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium">
                      {donation.restaurant?.name || "Unknown Restaurant"}
                    </span>
                  </p>

                  <p className="text-xs text-gray-500">
                    <strong>Location:</strong>{" "}
                    {donation.restaurant?.location || "Unknown Location"}
                  </p>

                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      donation.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {donation.status}
                  </span>

                  <div>
                    <Link
                      to={`/donation-details/${donation._id}`}
                      className="mt-2 btn-xs inline-block text-sm text-white bg-accent hover:bg-primary px-4 hover:scale-105 py-2 rounded-full"
                    >
                      View Details
                    </Link>
                  </div>
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
