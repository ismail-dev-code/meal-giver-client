import Swal from "sweetalert2";
import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter your email address.",
        icon: "warning",
        confirmButtonColor: "#0D9488", 
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    Swal.fire({
      title: "Subscribe to MealGiver?",
      text: `You'll get updates, stories, and donation opportunities at ${email}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, subscribe!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: true,
      background: "#fff",
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thank You!",
          text: `You're now part of the MealGiver community 💚.`,
          icon: "success",
          confirmButtonColor: "#0D9488",
        });
        setEmail("");
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between border border-gray-200 shadow-lg mb-10 rounded-xl py-10 mx-4 md:py-16 px-4 md:px-10 bg-gradient-to-r from-teal-50 to-white">
      <div className="flex-1 text-center md:text-left">
        <h2 className="md:text-xl text-2xl font-semibold text-primary">
          MealGiver Newsletter
        </h2>
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">
          Stay Connected, Make an Impact
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Get the latest updates, inspiring donor stories, and ways to spread hope.
        </p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-auto flex-1 border border-gray-300 pl-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Enter your email address..."
        />
        <button
          onClick={handleSubscribe}
          className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-accent cursor-pointer transition-colors text-white font-medium rounded-md sm:rounded-r-xl"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
