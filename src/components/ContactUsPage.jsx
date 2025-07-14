import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSubmit = (data) => {
    //I will handle actual form submission here (like send to backend)
    console.log("Form Data:", data);
    toast.success("Thanks for messaging us. We’ll get back to you soon!");
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        We’d love to hear from you! Whether you’re a restaurant looking to
        donate, a charity interested in partnering, a volunteer ready to help,
        or just someone with a question — MealGiver is always here for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Our Office
          </h2>
          <p className="text-gray-700 mb-3">
            📍 House #12, Road #7, Block A <br />
            Maijdee, Noakhali, Bangladesh
          </p>

          <p className="text-gray-700 mb-3">
            📞 Phone:{" "}
            <a
              href="tel:+8801234567890"
              className="text-primary hover:underline"
            >
              +880 1234 567890
            </a>
          </p>

          <p className="text-gray-700 mb-3">
            ✉️ Email:{" "}
            <a
              href="mailto:support@mealgiver.org"
              className="text-primary hover:underline"
            >
              support@mealgiver.org
            </a>
          </p>

          <p className="text-gray-700 mb-3">
            🕒 Hours: Open 24/7 except Friday 11am–2pm (closed)
          </p>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                rows="4"
                {...register("message", { required: "Message is required" })}
                placeholder="Type your message here..."
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-primary text-white font-semibold rounded hover:bg-primary/90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
