import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import MovieDetailWithInfiniteScroll from "./MovieDetailWithInfiniteScroll";

const selectMovieBy6MinuteInterval = (movies) => {
  if (!movies || movies.length === 0) return null;

  const currentMinutes = new Date().getMinutes();
  const interval = Math.floor(currentMinutes / 6);
  const index = interval % movies.length;

  return movies[index];
};

const MainContainer = () => {
  const [movieToDisplay, setMovieToDisplay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  useEffect(() => {
    const updateMovie = () => {
      const movie = selectMovieBy6MinuteInterval(movies);
      setMovieToDisplay(movie);
    };

    updateMovie();

    const intervalId = setInterval(updateMovie, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [movies]);

  const handleMoreInfo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!movieToDisplay) {
    return (
      <div className="text-center text-gray-500">
        <p>No movie available to display. Please try again later.</p>
      </div>
    );
  }

  const { title, overview, id, poster_path } = movieToDisplay;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle
        title={title}
        overview={overview}
        movieId={id}
        onMoreInfo={handleMoreInfo}
        aria-label={`Featured movie: ${title}`}
      />
      <VideoBackground movieId={id} poster={poster_path} />
      {isModalOpen && (
        <MovieDetailWithInfiniteScroll
          movie={movieToDisplay} // Pass the selected movie
          category={"Now Playing"}
          hideOtherMovies={true} // Add this prop
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MainContainer;
