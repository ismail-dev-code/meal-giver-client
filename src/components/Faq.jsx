import React, { useState, useEffect } from "react";
import AOS from "aos";

const Faq = () => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const initialFaqs = [
    {
      question: "How does MealGiver work?",
      answer:
        "MealGiver connects restaurants, individuals, and charities. Donors can post surplus food, charities can request it, and volunteers help with pickup and delivery.",
    },
    {
      question: "Who can donate food?",
      answer:
        "Both individuals and organizations (restaurants, events, businesses) can donate food through MealGiver.",
    },
    {
      question: "How can charities receive donations?",
      answer:
        "Charities can create an account, verify their role, and request donations directly through the platform.",
    },
    {
      question: "Is there any cost to use MealGiver?",
      answer:
        "MealGiver is free to use for donors and charities. Only optional features like premium support or integrations may involve charges in the future.",
    },
    {
      question: "Is the donated food safe?",
      answer:
        "Yes, we encourage donors to share only fresh, safe, and hygienic food. Charities can review donor ratings and provide feedback to ensure quality.",
    },
  ];

  const extraFaqs = [
    {
      question: "Can individuals request food?",
      answer:
        "Currently, donations are distributed via verified charities. However, individuals can connect with local charities listed on our platform.",
    },
    {
      question: "How do volunteers participate?",
      answer:
        "Volunteers can sign up and assist in transporting food from donors to charities. They receive notifications for pickup opportunities.",
    },
    {
      question: "Do you provide proof of delivery?",
      answer:
        "Yes, charities confirm food receipt digitally, and donors can view the status in real-time with proof of delivery.",
    },
    {
      question: "What areas does MealGiver cover?",
      answer:
        "We are continuously expanding. Currently, MealGiver operates in major cities and is scaling to cover more regions across Bangladesh.",
    },
    {
      question: "Can businesses partner with MealGiver?",
      answer:
        "Yes! Restaurants, event organizers, and food businesses can become official partners to regularly donate surplus food.",
    },
    {
      question: "Is there a rating or feedback system?",
      answer:
        "Yes, charities and donors can rate and review each other to maintain transparency and trust.",
    },
    {
      question: "How do I know my donation made an impact?",
      answer:
        "Donors receive updates once food is picked up and delivered, along with feedback from the receiving charity.",
    },
    {
      question: "Is financial donation possible?",
      answer:
        "Yes, users can donate funds through MealGiver. Collected funds are used for logistics, packaging, and scaling food redistribution efforts.",
    },
    {
      question: "How do I report an issue?",
      answer:
        "You can reach out to our support team via the 'Help & Support' section. We take reports seriously to ensure safety and fairness.",
    },
  ];

  const faqsToShow = showMore ? [...initialFaqs, ...extraFaqs] : initialFaqs;

  return (
    <div className="px-4 py-12">
      <div className="text-center mb-8" data-aos="fade-down">
        <h1 className="md:text-3xl text-2xl font-bold mb-2">Frequently Asked Questions (FAQ)</h1>
        <p className="text-gray-600 pb-4">
          Find quick answers about donating, receiving, and participating in the MealGiver platform.
        </p>
      </div>

      <div className="space-y-4">
        {faqsToShow.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <input type="radio" name={`faq-accordion-${index}`} />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8" data-aos="zoom-in">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-white btn btn-primary"
        >
          {showMore ? "Show Less" : "See More FAQ's"}
        </button>
      </div>
    </div>
  );
};

export default Faq;
