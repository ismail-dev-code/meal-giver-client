import React, { useEffect } from "react";
import LatestCharityRequests from "../charity/LatestCharityRequests";
import ImpactStats from "../imapactStats/ImpactStats";
import CommunityStories from "../CommunityStories/CommunityStories ";
import Banner from "../banner/Banner";
import FeaturedDonationsHome from "../FeaturedSection/FeaturedDonationsHome";
import { Helmet } from "react-helmet-async";
import Faq from "../../../components/Faq";
import OurServices from "../../../components/OurServices";
import NewsLetter from "../../../components/NewsLetter";
import TrustedPartners from "../../../components/TrustedPartners";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
    <Helmet>
        <title>MealGiver | Home</title>
      </Helmet>
      <div className="font-montserrat">
        <Banner />
      </div>
      <div className="max-w-6xl mx-auto">
        <FeaturedDonationsHome />
        <LatestCharityRequests />
        <ImpactStats />
        <TrustedPartners/>
        <CommunityStories />
        <OurServices/>
        <Faq/>
        <NewsLetter/>
      </div>
    </>
  );
};

export default Home;
