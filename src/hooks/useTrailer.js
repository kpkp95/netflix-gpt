import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieTrailer = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );

        if (!data.ok) {
          throw new Error("Failed to fetch video data");
        }

        const json = await data.json();
        console.log("API response for movie videos:", json);

        // Find "Official Trailer" or fallback to the first video
        const officialTrailer = json.results.find(
          (video) =>
            video.name.toLowerCase().includes("trailer") &&
            video.type === "Trailer"
        );
        const selectedTrailer = officialTrailer || json.results[0];
        if (selectedTrailer) {
          dispatch(addTrailerVideo(selectedTrailer));
        } else {
          throw new Error("No trailers found for this movie.");
        }
      } catch (err) {
        console.error("Error fetching movie trailer:", err);
        setError(err.message); // Set the error state
      } finally {
        setLoading(false); // Loading is done
      }
    };
    // Fetch new trailer only if movieId changes or there is no trailer data
    if (!trailerVideo || trailerVideo.id !== movieId) {
      getMovieTrailer();
    }
  }, [movieId, dispatch, trailerVideo]);

  return { error, loading };
};
export default useTrailer;
