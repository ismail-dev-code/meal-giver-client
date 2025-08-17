import React, { useState } from "react";

const DistrictSearchBox = ({ serviceCenters, onDistrictSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredDistricts = serviceCenters.filter((district) =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDistrict = (district) => {
    setSearchTerm(district);
    setShowSuggestions(false);
    setActiveIndex(-1);
    onDistrictSelect(district); 
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredDistricts.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredDistricts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredDistricts.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredDistricts.length) {
        handleSelectDistrict(filteredDistricts[activeIndex]);
      }
    }
  };

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        placeholder="Search your district..."
        className="input input-bordered w-full"
        value={searchTerm}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 cursor-pointer ${
                  idx === activeIndex
                    ? "bg-base-200"
                    : "hover:bg-base-100"
                }`}
                onMouseDown={() => handleSelectDistrict(district)}
              >
                {district}
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-red-500">No districts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DistrictSearchBox;