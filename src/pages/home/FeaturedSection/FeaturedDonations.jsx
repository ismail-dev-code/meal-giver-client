import { Link } from "react-router";

const featuredDonations = [
  {
    id: "1",
    image: "https://i.ibb.co/6Jq3dCy/bread-donation.webp",
    foodType: "Bakery",
    restaurant: "Bread & Beyond",
    location: "Gulshan, Dhaka",
    status: "Available",
  },
  {
    id: "2",
    image: "https://i.ibb.co/tJzzW9y/fruit-donation.jpg",
    foodType: "Produce",
    restaurant: "Green Harvest",
    location: "Banani, Dhaka",
    status: "Picked Up",
  },
  {
    id: "3",
    image: "https://i.ibb.co/GpCcHR3/hot-meal-donation.jpg",
    foodType: "Cooked Meal",
    restaurant: "Spice Palace",
    location: "Uttara, Dhaka",
    status: "Available",
  },
  {
    id: "4",
    image: "https://i.ibb.co/k1mHbnf/vegetable-donation.jpg",
    foodType: "Vegetables",
    restaurant: "The Green Bowl",
    location: "Dhanmondi, Dhaka",
    status: "Available",
  },
];

const FeaturedDonations = () => {
  return (
    <section className="pb-12 pt-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-8">
          Featured Donations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-md"
            >
              <img
                src={donation.image}
                alt={donation.foodType}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  {donation.foodType}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{donation.restaurant}</span> —{" "}
                  {donation.location}
                </p>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    donation.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {donation.status}
                </span>
                <div>
                  <Link
                    to={`/donations/${donation.id}`}
                    className="mt-2 inline-block text-sm text-white bg-accent hover:bg-primary px-4 py-2 rounded-full transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;
