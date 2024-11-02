import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MoviesList = ({ movies, title }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl  px-12 text-white">{title}</h1>

      <div className="flex items-center">
        <button onClick={scrollLeft} className="text-white">
          <MdChevronLeft size={40} color="white" /> {/* Change color here */}
        </button>

        <div
          id="slider"
          ref={sliderRef}
          className="overflow-x-scroll scroll-smooth no-scrollbar w-full"
        >
          <div className="flex space-x-4 p-2 w-max">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>

        <button onClick={scrollRight} className="text-white">
          <MdChevronRight size={40} color="white" /> {/* Change color here */}
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
