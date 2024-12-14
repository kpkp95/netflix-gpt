import React, { useState } from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import { categoryMapping } from "../utils/constant";
import MovieDetailWithInfiniteScroll from "./MovieDetailWithInfiniteScroll";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie, category) => {
    setSelectedMovie(movie); // Set the selected movie/TV show
    setSelectedCategory(category); // Set the category
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // Reset the selected movie/TV show
    setSelectedCategory(null); // Reset the category
    setIsModalOpen(false); // Close the modal
  };

  if (!movies) return null; // Early return if no movies are loaded

  return (
    <div className="bg-black">
      <div className="mt-0 xl:-mt-48 lg:mt-0 pl-2 md:pl-10 relative z-20">
        {Object.entries(categoryMapping).map(
          (
            [key, { title, type }] // Destructure `title` and `type`
          ) =>
            movies[key] && movies[key].length > 0 ? (
              <MoviesList
                key={key}
                title={title} // Pass the title string correctly
                type={type} // Optionally pass the type if needed
                movies={movies[key]}
                onMovieClick={(movie) => handleMovieClick(movie, key)}
                onOpenInfiniteScroll={() =>
                  handleMovieClick(movies[key][0], key)
                } // Pass first movie for infinite scroll
              />
            ) : (
              <p key={key} className="text-white text-sm px-8">
                No movies available for {title}.
              </p>
            )
        )}
      </div>
      {isModalOpen && selectedMovie && selectedCategory && (
        <MovieDetailWithInfiniteScroll
          movie={selectedMovie}
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SecondaryContainer;
