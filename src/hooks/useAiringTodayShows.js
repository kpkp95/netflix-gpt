import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAiringTodayShows } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useAiringTodayShows = () => {
  const dispatch = useDispatch(); // Get the dispatch function

  // Function to fetch movies data

  const getAiringTodayShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON
      console.log(json.results);
      dispatch(addAiringTodayShows(json.results)); // Dispatch the movie data to Redux
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
  };

  // Use useEffect to call the fetchMovies when the hook is used
  useEffect(() => {
    getAiringTodayShows(); // Call the fetch function when the component mounts
  }, []); // Depend on the URL so the hook will refetch if the URL changes
};

export default useAiringTodayShows;
