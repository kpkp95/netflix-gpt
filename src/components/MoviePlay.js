import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchFromAPI } from "../utils/api";

const MoviePlay = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Used for navigation
  const [trailerKey, setTrailerKey] = React.useState(null);

  React.useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const videosData = await fetchFromAPI(`/movie/${movieId}/videos`);
        const trailer = videosData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          console.error("No trailer available");
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  const handleClose = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!trailerKey) {
    return (
      <div className="text-white flex justify-center items-center min-h-screen bg-black">
        <p>No trailer available for this movie.</p>
        <button
          onClick={handleClose}
          className="bg-gray-700 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerKey}`}
        controls
        playing
        width="100%"
        height="100%"
        className="react-player"
      />
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  );
};

export default MoviePlay;
