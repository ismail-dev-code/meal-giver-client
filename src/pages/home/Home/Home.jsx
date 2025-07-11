import React, { useEffect } from "react";
import LatestCharityRequests from "../charity/LatestCharityRequests";
import ImpactStats from "../imapactStats/ImpactStats";
import CommunityStories from "../CommunityStories/CommunityStories ";
import Banner from "../banner/Banner";
import FeaturedDonationsHome from "../FeaturedSection/FeaturedDonationsHome";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Banner />
      <div className="max-w-6xl mx-auto">
        <FeaturedDonationsHome/>
        <LatestCharityRequests />
        <ImpactStats />
        <CommunityStories />
      </div>
    </>
  );
};

export default Home;
