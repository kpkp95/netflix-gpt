import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { fetchFromAPI } from "../utils/api";

const VideoTitle = ({ title, overview, movieId, onMoreInfo }) => {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const fallbackOverview = overview || "No description available.";

  const handlePlayTrailer = async () => {
    try {
      const videosData = await fetchFromAPI(`/movie/${movieId}/videos`);
      const trailer = videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setIsTrailerModalOpen(true);
      } else {
        console.error("No trailer available");
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
      alert("Failed to fetch the trailer. Please try again later.");
    }
  };

  const handleCloseTrailerModal = () => {
    setIsTrailerModalOpen(false);
    setTrailerKey(null);
  };

  const truncateText = (text, length) => {
    if (!text) return "No information available";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div className="w-screen aspect-video pt-[18%] px-8 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">
        {title || "Untitled Movie"}
      </h1>
      <p className="hidden xl:inline-block py-4 text-base md:text-lg w-full md:w-1/3">
        {truncateText(fallbackOverview, 120)}
      </p>
      <div className="flex space-x-4 mt-2 sm:mt-4">
        <button
          onClick={handlePlayTrailer}
          className="flex items-center bg-white hover:bg-gray-400  hover:scale-105 transition-transform text-black py-1 px-3 md:py-3 md:px-6 xl:py-4 xl:px-8 bg-opacity-90 rounded-lg text-sm md:text-base"
          aria-label="Play the video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 md:h-6 md:w-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          Play Trailer
        </button>
        <button
          onClick={onMoreInfo}
          className="md:flex items-center hidden bg-white hover:bg-gray-400 text-black py-2 px-3 md:py-3 md:px-4 xl:py-4 md:text-base xl:px-8 bg-opacity-90  hover:scale-105 transition-transform rounded-lg text-lg"
          aria-label="More information about the video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 md:h-6 md:w-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
              clipRule="evenodd"
            />
          </svg>
          More Info
        </button>
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

export default VideoTitle;
