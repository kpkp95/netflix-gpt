import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoviesList from "./MoviesList";
import MovieDetailWithInfiniteScroll from "./MovieDetailWithInfiniteScroll";
import { addGptMovieResult } from "../utils/gptSlice";
const GptMoviesSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  const { gptMovieNames, tmdbMovieNames } = gpt;

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!gptMovieNames) return null;

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleClearResults = () => {
    dispatch(
      addGptMovieResult({
        gptMovieNames: null,
        tmdbMovieNames: null,
      })
    );
  };

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-85">
      {gptMovieNames.length === 1 && tmdbMovieNames[0]?.length > 0 ? (
        // Direct search results
        <MoviesList
          key={gptMovieNames[0]}
          title={`Results for "${gptMovieNames[0]}"`}
          movies={tmdbMovieNames[0]}
          onMovieClick={handleMovieClick}
          onClearResults={handleClearResults}
          showClearButton={true}
        />
      ) : (
        // GPT-based suggestions
        gptMovieNames.map((movieName, index) => (
          <MoviesList
            key={movieName}
            title={movieName}
            movies={tmdbMovieNames[index]}
            onMovieClick={handleMovieClick} // Pass movie click handler
            onClearResults={handleClearResults}
            showClearButton={true}
          />
        ))
      )}

      {/* Movie Detail Modal */}
      {isModalOpen && selectedMovie && (
        <MovieDetailWithInfiniteScroll
          movie={selectedMovie}
          category={"GPT Search"}
          hideOtherMovies={true}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GptMoviesSuggestions;
