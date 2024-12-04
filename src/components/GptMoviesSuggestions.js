import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMoviesSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovieNames, tmdbMovieNames } = gpt;
  if (!gptMovieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-85">
      {gptMovieNames.map((movieName, index) => (
        <MoviesList
          key={movieName}
          title={movieName}
          movies={tmdbMovieNames[index]}
        />
      ))}
    </div>
  );
};

export default GptMoviesSuggestions;
