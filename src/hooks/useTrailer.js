import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useTrailer = (movieId) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.movies?.error);
  const [loading, setLoading] = useState(true);

  const getMovieTrailer = async () => {
    try {
      setLoading(true);
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
      const officialTrailer = json.results.filter(
        (video) => video.name === "Official Trailer"
      );
      const selectedTrailer = officialTrailer.length
        ? officialTrailer[0]
        : json.results[0];
      console.log("useTrailer", selectedTrailer);
      dispatch(addTrailerVideo(selectedTrailer));
    } catch (err) {
      console.error("Error fetching movie trailer:", err);
      dispatch({ type: "movies/fetchTrailerFailure", payload: err.message });
    } finally {
      setLoading(false); // Loading is done
    }
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieId, dispatch]);

  return { error, loading };
};
export default useTrailer;
