const CommunityStories = () => {
  const stories = [
    {
      id: 1,
      name: "Spice Hub Restaurant",
      quote:
        "Partnering with MealGiver helped us make a meaningful difference. We've donated over 200 meals!",
      role: "Restaurant Partner",
      image: "https://i.ibb.co/tp7gMNp/restaurant.jpg",
    },
    {
      id: 2,
      name: "Hope for All Foundation",
      quote:
        "Thanks to MealGiver, we serve warm meals daily. The process is simple and impactful.",
      role: "Charity Partner",
      image: "https://i.ibb.co/8KcVj9T/charity.jpg",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary mb-10">
          Community Stories
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-gray-50 border p-6 rounded-lg flex flex-col md:flex-row gap-4 items-start"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <p className="text-gray-700 italic mb-2">"{story.quote}"</p>
                <p className="text-sm font-semibold">{story.name}</p>
                <p className="text-xs text-gray-500">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CommunityStories;
