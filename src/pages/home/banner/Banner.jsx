import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slider1 from "../../../assets/slider/slide1t.webp";
import slider2 from "../../../assets/slider/slider2webp.webp";
import slider3 from "../../../assets/slider/slider3.jpg";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      title: "Reduce Food Waste, Feed the Needy",
      description:
        "MealGiver connects restaurants with charities to reduce food waste and fight hunger. Join our mission to reduce food waste and uplift communities.",
      image: slider1,
      buttonText: "Contact Us",
      buttonLink: "/contact-us",
    },
    {
      title: "Supporting communities through food.",
      description:
        "Be part of the solution. Every meal counts for someone in need. Your contribution through MealGiver directly supports families and individuals in need.",
      image: slider2,
      buttonText: "Browse Donations",
      buttonLink: "/all-donations",
    },
    {
      title: "Make an Impact Today: Your Actions Matter",
      description:
        "Every meal saved is a step toward a better world. Whether you're donating surplus food from your restaurant or volunteering your time — your actions can change lives.",
      image: slider3,
      buttonText: "Read More",
      buttonLink: "/about-us",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0,0,0,0.2)), url(${slide.image})`,
              }}
            >
              <div className="h-full flex items-center justify-start px-4 md:px-12 lg:px-20">
                <div className="text-white max-w-2xl">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold md:mb-1 drop-shadow">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg mb-2 drop-shadow">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-accent hover:bg-primary text-white font-semibold text-sm md:text-base py-2 px-5 md:px-6 rounded-full transition duration-300"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
