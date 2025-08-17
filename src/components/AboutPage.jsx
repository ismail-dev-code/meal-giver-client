import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>MealGiver | About</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-lg  mb-6 leading-relaxed">
          <strong>MealGiver</strong> is a nonprofit initiative committed to
          reducing food waste and combating hunger across communities. Every
          year, tons of perfectly good food go to waste while thousands of
          people go without a meal. At MealGiver, we believe that no one should
          have to choose between a meal and other basic needs — and no food
          should be discarded while others are in need.
        </p>

        <h2 className="text-2xl font-semibold  mb-4">
          Our Mission
        </h2>
        <p className=" mb-6 leading-relaxed">
          We aim to bridge the gap between food surplus and food insecurity by
          enabling restaurants, bakeries, and food service providers to share
          excess meals with verified charities and humanitarian organizations.
          Through a seamless coordination network, we ensure that available food
          reaches the hands of those who need it most — quickly, safely, and
          with dignity.
        </p>

        <h2 className="text-2xl font-semibold  mb-4">
          What We Do
        </h2>
        <ul className="list-disc list-inside  space-y-2 mb-6">
          <li>
            Coordinate timely food donations from local restaurants and food
            vendors.
          </li>
          <li>
            Partner with verified charities and shelters to distribute meals to
            those in need.
          </li>
          <li>
            Ensure food safety and accountability through transparent tracking.
          </li>
          <li>
            Encourage responsible consumption and sustainable community values.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold  mb-4">
          Our Impact
        </h2>
        <p className=" mb-6 leading-relaxed">
          Since launching in early 2023, MealGiver has helped redistribute over{" "}
          <strong> 18,400+ meals </strong>
          across 64 districts, prevented an estimated <strong>25 tons</strong> of
          food waste, and supported over
          <strong> 120 charitable organizations</strong> working at the
          grassroots level. Behind every donation is a story — of a child fed,
          of a mother supported, of a community uplifted.
        </p>

        <h2 className="text-2xl font-semibold  mb-4">
          Our Values
        </h2>
        <ul className="list-disc list-inside  space-y-2 mb-6">
          <li>
            <strong>Compassion:</strong> We put people first — every decision
            starts with empathy.
          </li>
          <li>
            <strong>Transparency:</strong> We operate with openness and
            accountability in all that we do.
          </li>
          <li>
            <strong>Efficiency:</strong> We value time, logistics, and precision
            to make a real difference.
          </li>
          <li>
            <strong>Collaboration:</strong> We work with communities, not just
            for them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold  mb-4">
          Who We Serve
        </h2>
        <p className=" mb-6 leading-relaxed">
          MealGiver supports a wide range of beneficiaries — from shelters,
          orphanages, and community kitchens to rural outreach programs and
          crisis relief efforts. Our network of partners includes certified
          NGOs, volunteer organizations, and frontline workers ensuring
          equitable food distribution every day.
        </p>

        <h2 className="text-2xl font-semibold  mb-4">
          Get Involved
        </h2>
        <p className=" leading-relaxed">
          Whether you're a restaurant with surplus meals, a charity looking to
          expand outreach, or an individual who believes in the power of giving
          — there's a place for you at MealGiver. Together, we can transform the
          way communities handle food, and make sure no meal goes to waste, and
          no neighbor goes hungry.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
