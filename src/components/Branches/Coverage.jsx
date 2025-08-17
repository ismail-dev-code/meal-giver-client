import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import DistrictSearchBox from "./DistrictSearchBox";
import BangladeshMap from "./BangladeshMap";

const Coverage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleDistrictSelect = (districtName) => {
    const match = serviceCenters.find(
      (d) => d.district.toLowerCase() === districtName.toLowerCase()
    );
    if (match) {
      setSelectedLocation({
        district: match.district,
        latitude: match.latitude,
        longitude: match.longitude,
        covered_area: match.covered_area,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>
      <DistrictSearchBox
        serviceCenters={serviceCenters.map((d) => d.district)}
        onDistrictSelect={handleDistrictSelect}
      />
      <BangladeshMap
        serviceCenters={serviceCenters}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default Coverage;