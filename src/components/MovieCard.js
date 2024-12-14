import React from "react";
import { IMG_CDN_URL, noImageUrl } from "../utils/constant";

const MovieCard = ({ posterPath, name, onClick }) => {
  const imageSrc = posterPath ? IMG_CDN_URL + posterPath : noImageUrl;
  return (
    <div
      className="w-32 h-40 md:w-46 md:h-60 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
      onClick={onClick} // Trigger onClick when card is clicked
    >
      <img
        className="w-full h-full object-cover"
        src={imageSrc}
        alt={name || "No Title Available"}
      />
    </div>
  );
};

export default MovieCard;
