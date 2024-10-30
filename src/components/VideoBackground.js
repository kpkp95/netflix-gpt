import { useSelector } from "react-redux";
import useTrailer from "../hooks/useTrailer";

const VideoBackground = ({ movieId }) => {
  const { error, loading } = useTrailer(movieId);
  const trailer = useSelector((store) => store.movies?.trailerVideo);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-spinner">Loading trailer...</div>;
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
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; "
        ></iframe>
      ) : (
        <p>No valid trailer found.</p>
      )}
    </div>
  );
};

export default VideoBackground;
