import React, { useEffect } from 'react';
import FeaturedDonations from '../FeaturedSection/FeaturedDonations';
import LatestCharityRequests from '../charity/LatestCharityRequests';
import ImpactStats from '../imapactStats/ImpactStats';
import CommunityStories from '../CommunityStories/CommunityStories ';


const Home = () => {
     useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
    return (
        <div>
        <FeaturedDonations/>
        <LatestCharityRequests/>
        <ImpactStats/>
        <CommunityStories/>
        </div>
    );
};

export default Home;