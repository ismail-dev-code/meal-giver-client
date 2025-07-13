import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "../../../components/MealGiver/Loading";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const CommunityStories = () => {
  const axiosSecure = useAxiosSecure();
  const swiperRef = useRef(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["communityStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/community");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const shuffledStories = shuffleArray(stories);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="md:text-3xl font-bold text-gray-800 mb-12">Community Stories</h2>

        {shuffledStories.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No community reviews found.</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            loop={true}
            grabCursor={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {shuffledStories.map((story) => (
              <SwiperSlide key={story._id}>
                <div className="bg-white p-6 rounded-2xl shadow-lg h-[300px] flex flex-col justify-between transition duration-300 hover:shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image || "/default-logo.png"}
                      alt={story.name || "Charity"}
                      className="w-16 h-16 object-cover rounded-full border border-gray-300 shadow-sm"
                    />
                    <div className="text-left">
                      <p
                        className="font-semibold md:text-lg text-gray-800"
                        title={story.name || story.reviewer || "Anonymous"}
                      >
                        {story.name || story.reviewer || "Anonymous"}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate max-w-[160px]"
                        title={story.role || story.restaurantName || "Community Member"}
                      >
                        {story.role || story.restaurantName || "Community Member"}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-gray-700 text-[15px] italic text-left py-2 leading-relaxed relative line-clamp-5"
                    title={story.comment || story.quote || "No feedback provided."}
                  >
                    “{story.comment || story.quote || "No feedback provided."}”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default CommunityStories;
