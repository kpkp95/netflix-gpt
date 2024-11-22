import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import { BACKGROUND_IMG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-20">
        <img
          src={BACKGROUND_IMG_URL}
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <GptSearchBar />
      <GptMoviesSuggestions />
    </div>
  );
};

export default GptSearch;
