import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MoviesList = ({
  movies,
  title,
  onMovieClick,
  onOpenInfiniteScroll,
  onClearResults,
  showClearButton,
}) => {
  const sliderRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkIfAtEnd = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5); // Adjust for rounding
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setIsAtEnd(false); // Reset state when scrolling left
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
      checkIfAtEnd(); // Check if at the end after scrolling
    }
  };

  const handleScroll = () => {
    checkIfAtEnd(); // Check whenever the user scrolls
  };

  return (
    <div className="px-2">
      <div className="flex justify-between items-center px-8 md:px-0">
        <h1 className="md:text-2xl inline-block text-lg px-8 md:px-11 text-white">
          {title}
        </h1>
        {showClearButton && (
          <button
            onClick={onClearResults}
            className="bg-gray-700 text-white  mx-8 px-3 py-1 rounded-full hover:bg-gray-600 transition z-10"
          >
            Clear Results
          </button>
        )}
      </div>
      <div className="flex items-center">
        <button onClick={scrollLeft} className="text-white">
          <MdChevronLeft className="text-3xl md:text-4xl" />
        </button>

        <div
          id="slider"
          ref={sliderRef}
          onScroll={handleScroll} // Attach scroll handler
          className="overflow-x-scroll scroll-smooth no-scrollbar w-full"
        >
          <div className="flex space-x-4 p-2 w-max">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                name={movie.title || movie.name}
                posterPath={movie.poster_path}
                onClick={() => onMovieClick(movie)}
              />
            ))}
          </div>
        </div>
        {isAtEnd ? (
          <button
            onClick={onOpenInfiniteScroll}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 opacity-90 font-sm"
          >
            <div className="inline-flex h-12 translate-y-0 items-center justify-center bg-black px-0 text-white transition group-hover:-translate-y-[150%]m opacity-90">
              More Movies
            </div>
            <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center bg-blue-500 px-0 text-neutral-50 transition duration-300 opacity-90 group-hover:translate-y-0">
              More Movies
            </div>
          </button>
        ) : (
          <button onClick={scrollRight} className="text-white">
            <MdChevronRight className="text-3xl md:text-4xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
