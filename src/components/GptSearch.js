import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import { BACKGROUND_IMG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-20">
        <img
          src={BACKGROUND_IMG_URL}
          alt="bg"
          className="h-screen w-screen object-cover "
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMoviesSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
