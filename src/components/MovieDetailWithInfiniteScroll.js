import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player"; // Add ReactPlayer
import {
  fetchInfiniteScrollMovies,
  fetchCastMembers,
} from "../utils/apiInfiniteScroll";
import MovieCard from "./MovieCard";
import { categoryMapping } from "../utils/constant";
import { fetchFromAPI } from "../utils/api";
import { noImageUrl } from "../utils/constant";

const MovieDetailWithInfiniteScroll = ({
  movie,
  category,
  onClose,
  hideOtherMovies,
}) => {
  const [movies, setMovies] = useState([]);
  const [currentItem, setCurrentItem] = useState(movie);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // New state
  const [trailerKey, setTrailerKey] = useState(null); // New state

  const isTVSeries = category.includes("TV") || category.includes("Shows");

  useEffect(() => {
    const loadMovies = async () => {
      if (hideOtherMovies) return; // Skip fetching if `hideOtherMovies` is true
      setLoading(true);
      try {
        const newMovies = await fetchInfiniteScrollMovies(category, page);
        if (newMovies?.results?.length) {
          const uniqueMovies = newMovies.results.filter(
            (newMovie) =>
              !movies.some((existingMovie) => existingMovie.id === newMovie.id)
          );
          setMovies((prev) => [...prev, ...uniqueMovies]);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category, page, hideOtherMovies]);

  useEffect(() => {
    const loadCast = async () => {
      if (!currentItem?.id) return;
      try {
        const castData = await fetchCastMembers(
          currentItem.id,
          isTVSeries ? "tv" : "movie"
        );
        setCast(castData);
      } catch (error) {
        console.error("Failed to fetch cast members:", error);
      }
    };

    loadCast();
  }, [currentItem]);

  const handlePlayTrailer = async () => {
    if (!currentItem?.id) {
      console.error("No valid movie or show selected for trailer playback.");
      return;
    }
    try {
      const response = await fetchFromAPI(
        isTVSeries
          ? `/tv/${currentItem.id}/videos`
          : `/movie/${currentItem.id}/videos`
      ); // Use correct endpoint based on item type

      const trailer = response.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsTrailerModalOpen(true);
      } else {
        console.error("Trailer not available.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  const handleCloseTrailerModal = () => {
    setIsTrailerModalOpen(false);
    setTrailerKey(null);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleMovieClick = (movie) => {
    setCurrentItem(movie);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-[90%] max-w-[800px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={
                `https://image.tmdb.org/t/p/w500${currentItem?.poster_path}` ||
                noImageUrl
              }
              alt={currentItem?.title || currentItem?.name}
              className="w-full md:w-1/3 rounded-lg"
            />
            <div className="flex-1 text-white">
              <h1 className="text-2xl font-bold">
                {currentItem?.title || currentItem?.name || "Untitled Movie"}
              </h1>
              <p className="text-gray-400 my-2">
                {currentItem?.overview || "No description available."}
              </p>
              <p>
                <strong>Release Date:</strong>{" "}
                {currentItem?.release_date ||
                  currentItem?.first_air_date ||
                  "N/A"}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {currentItem?.vote_average
                  ? currentItem.vote_average.toFixed(1)
                  : "N/A"}
              </p>
              <p>
                <strong>Cast:</strong>{" "}
                {cast.map((member) => member.name).join(", ") || "N/A"}
              </p>
              <button
                onClick={handlePlayTrailer}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 inline-block hover:bg-blue-600 transition"
              >
                Play Trailer
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>

        {/* Conditionally Render Other Movies */}
        {!hideOtherMovies && (
          <div
            className="overflow-y-auto p-4"
            style={{ maxHeight: "400px" }}
            onScroll={handleScroll}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Other {isTVSeries ? "Shows" : "Movies"} in{" "}
              {categoryMapping[category]?.title || category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="cursor-pointer"
                >
                  <MovieCard
                    posterPath={movie.poster_path}
                    name={movie.title || movie.name}
                  />
                </div>
              ))}
            </div>

            {loading && (
              <p className="text-white text-center mt-4 animate-pulse">
                Loading more {isTVSeries ? "shows" : "movies"}...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {isTrailerModalOpen && trailerKey && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={handleCloseTrailerModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              controls
              playing
              width="100%"
              height="100%"
            />
            <button
              onClick={handleCloseTrailerModal}
              className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailWithInfiniteScroll;
