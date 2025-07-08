import React from "react";

const charityRequests = [
  {
    id: 1,
    name: "Hope Foundation",
    logo: "https://i.ibb.co/hfRPZFt/hope-logo.png",
    description: "Seeking fresh meals for an upcoming shelter distribution event.",
    donationTitle: "Cooked Meal from Spice Palace",
  },
  {
    id: 2,
    name: "Helping Hands",
    logo: "https://i.ibb.co/rQhYjBt/helping-hands.png",
    description: "In need of vegetable donations for our daily soup kitchen.",
    donationTitle: "Surplus Vegetables from The Green Bowl",
  },
  {
    id: 3,
    name: "Food for All",
    logo: "https://i.ibb.co/PYq4Q1s/foodforall-logo.png",
    description: "Looking for bakery items for children's meal distribution.",
    donationTitle: "Leftover Breads from Bread & Beyond",
  },
];

const LatestCharityRequests = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-10">
          Latest Charity Requests
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {charityRequests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-50 border rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={req.logo}
                  alt={req.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {req.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {req.description}
              </p>
              <p className="text-sm text-primary font-medium">
                📦 {req.donationTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;
