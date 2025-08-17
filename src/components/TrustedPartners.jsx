import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHandshake, FaBuilding, FaUtensils } from "react-icons/fa";

const partners = [
  {
    id: 1,
    name: "FoodForAll Foundation",
    logo: <FaHandshake className="text-4xl text-green-600" />,
    description: "A global NGO dedicated to reducing food waste and hunger.",
  },
  {
    id: 2,
    name: "Urban Eats",
    logo: <FaUtensils className="text-4xl text-orange-500" />,
    description: "Local restaurant chain committed to donating surplus meals daily.",
  },
  {
    id: 3,
    name: "Hope Community Center",
    logo: <FaBuilding className="text-4xl text-blue-600" />,
    description: "Charity organization distributing donated meals to families in need.",
  },
];

export default function TrustedPartners() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 data-aos="fade-up" className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
          Our Trusted Partners & Sponsors
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" className="text-gray-600 mb-12 max-w-2xl mx-auto">
          MealGiver collaborates with leading organizations, restaurants, and
          charities who share our vision of a world with less waste and more hope.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{partner.logo}</div>
              <h3 className="text-lg font-semibold text-gray-800">{partner.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
