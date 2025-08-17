import React from "react";
import {
  FaUtensils,
  FaHandsHelping,
  FaPeopleCarry,
  FaLeaf,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const services = [
  {
    icon: <FaUtensils className="text-4xl" />,
    title: "Food Donation",
    description:
      "Individuals, restaurants, and businesses can donate surplus food securely through the MealGiver platform to help those in need.",
  },
  {
    icon: <FaHandsHelping className="text-4xl" />,
    title: "Charity Support",
    description:
      "Verified charities can request and receive fresh, safe food donations, ensuring meals reach the right communities.",
  },
  {
    icon: <FaPeopleCarry className="text-4xl" />,
    title: "Volunteer Network",
    description:
      "Volunteers help transport and distribute food from donors to charities, building a bridge of kindness in every city.",
  },
  {
    icon: <FaLeaf className="text-4xl" />,
    title: "Zero Food Waste",
    description:
      "By redistributing surplus meals, we actively reduce food waste while fighting hunger across communities.",
  },
  {
    icon: <FaHeartbeat className="text-4xl" />,
    title: "Impact Tracking",
    description:
      "Donors and charities receive real-time updates, proof of delivery, and impact reports to build transparency and trust.",
  },
  {
    icon: <FaHandHoldingHeart className="text-4xl" />,
    title: "Community Empowerment",
    description:
      "MealGiver fosters a culture of sharing and compassion, empowering communities to take part in solving hunger together.",
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: "Collaborative Projects",
    description:
      "We partner with local organizations and communities to implement projects that tackle food insecurity effectively.",
  },
  {
    icon: <FaGlobe className="text-4xl" />,
    title: "Global Reach",
    description:
      "MealGiver aims to expand our platform globally, connecting donors and charities across borders for greater impact.",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-base-100 text-base-content">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="md:text-3xl text-xl font-bold mb-4">Our Services</h2>
        <p className="max-w-3xl mx-auto text-lg">
          MealGiver is more than a platform it’s a movement. From donating surplus food 
          to supporting charities and empowering volunteers, we work together to 
          fight hunger and reduce waste.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="card hover:bg-primary hover:text-white transition-all cursor-pointer shadow-md hover:shadow-lg duration-500"
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            data-aos-duration="800"
          >
            <div className="card-body items-center text-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="card-title text-xl font-semibold">
                {service.title}
              </h3>
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
