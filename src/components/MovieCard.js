import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath, name }) => {
  if (!posterPath) return null;
  return (
    <div className="w-46 h-60 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
      <img
        className="w-full h-full object-cover"
        src={IMG_CDN_URL + posterPath}
        alt={name}
      />
    </div>
  );
};

export default MovieCard;
