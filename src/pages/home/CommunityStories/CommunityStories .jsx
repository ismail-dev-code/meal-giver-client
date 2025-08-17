import React, { useRef, useMemo } from "react";
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

  const shuffledStories = useMemo(() => shuffleArray(stories), [stories]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="md:text-3xl text-xl font-bold text-center text-secondary mb-4 md:mb-10">
          Community Stories
        </h2>

        {shuffledStories.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No community reviews found.
          </p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            loop={true}
            grabCursor={true}
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
                <div
                  data-aos="fade-down"
                  className="p-6 bg-white rounded-2xl h-[300px] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-center gap-4 mb-2">
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
                        title={
                          story.role ||
                          story.restaurantName ||
                          "Community Member"
                        }
                      >
                        {story.role ||
                          story.restaurantName ||
                          "Community Member"}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-gray-700 text-[15px] overflow-hidden italic text-left py-2 relative"
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
