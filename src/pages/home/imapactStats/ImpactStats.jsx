const ImpactStats = () => {
  const stats = [
    { label: "Total Food Donated", value: "5,200 kg", icon: "🥕" },
    { label: "Meals Served", value: "18,400", icon: "🍽️" },
    { label: "CO₂ Emissions Prevented", value: "12,300 kg", icon: "🌱" },
  ];

  return (
    <section className=" py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Collective Impact</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className=" p-6 rounded-lg shadow"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ImpactStats;