import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { fetchFromAPI } from "../utils/api";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  // Function to fetch movies data

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await fetchFromAPI("/movie/now_playing");
        dispatch(addNowPlayingMovies(data.results));
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
      }
    };

    fetchNowPlaying();
  }, [dispatch]);
};

export default useNowPlayingMovies;
