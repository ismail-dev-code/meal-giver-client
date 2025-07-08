import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm text-gray-500">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;