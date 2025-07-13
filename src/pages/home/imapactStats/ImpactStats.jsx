import React from "react";
import CountUp from "react-countup";

const ImpactStats = () => {
  const stats = [
    { label: "Total Food Donated", value: "5200", unit: "kg", icon: "🥕", duration: 10 },
    { label: "Meals Served", value: "18400", unit: "", icon: "🍽️", duration: 30 },
    { label: "CO₂ Emissions Prevented", value: "12300", unit: "kg", icon: "🌱",  duration: 7 },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="md:text-3xl font-bold mb-8">Our Collective Impact</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i}
            data-aos="fade-up"
              data-aos-delay={i * 100}
            className="p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-semibold">
                <CountUp
                  end={Number(stat.value)}
                  duration={stat.duration}
                  separator=","
                />{" "}
                {stat.unit}
              </p>
              <p className="text-sm mt-1 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
