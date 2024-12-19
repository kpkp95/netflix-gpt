import React from "react";

const Shimmer = () => {
  const rows = 3; // Number of rows of shimmers
  const itemsPerRow = 10; // Number of shimmer cards per row
  const shimmerRows = Array.from({ length: rows });

  return (
    <div className="flex flex-col gap-6 p-4">
      {shimmerRows.map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 justify-center flex-wrap">
          {Array.from({ length: itemsPerRow }).map((_, index) => (
            <div
              key={index}
              className="w-32 h-40 md:w-46 md:h-60 bg-gray-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-full bg-gray-700"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
