import { useSelector } from "react-redux";
import useTrailer from "../hooks/useTrailer";
import { IMG_CDN_URL } from "../utils/constant";

const VideoBackground = ({ movieId, poster }) => {
  const { error, loading } = useTrailer(movieId);
  const trailer = useSelector((store) => store.movies?.trailerVideo);

  if (error) {
    return (
      <div className="w-screen h-[70vh] flex flex-col justify-center items-center bg-black text-white">
        <p className="text-lg font-semibold mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-screen h-[70vh] flex justify-center items-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600"></div>
        <p className="text-white mt-4">Loading trailer...</p>
      </div>
    );
  }
  // Return iframe only when the trailer is available
  return (
    <div className="w-screen">
      {trailer ? (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube-nocookie.com/embed/${trailer?.key}?autoplay=1&mute=1`}
          title="Movie Trailer"
          aria-label="Movie Trailer"
        ></iframe>
      ) : (
        <img
          src={`${IMG_CDN_URL}${poster}`}
          alt="Movie Poster"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default VideoBackground;
