import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
      <p className="py-4 text-base md:text-lg w-full md:w-1/3">{overview}</p>
      <div className="flex space-x-4 mt-4">
        <button
          className="flex items-center bg-white hover:bg-gray-400 text-black p-4 px-8 bg-opacity-90 rounded-lg text-lg"
          aria-label="Play the video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 mr-2" // Adjust size and margin
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          Play
        </button>
        <button
          className="flex items-center  bg-white hover:bg-gray-400 text-black p-4 px-8 bg-opacity-90 rounded-lg text-lg"
          aria-label="More information about the video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 mr-2" // Adjust size and margin
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
    </div>
  );
};

export default VideoTitle;
