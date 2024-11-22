import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHorrorMovies, addAllMovies } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useHorrorMovies = () => {
  const dispatch = useDispatch(); // Get the dispatch function

  // Function to fetch movies data

  const getHorrorMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON
      console.log(json.results);
      dispatch(addHorrorMovies(json.results)); // Dispatch the movie data to Redux
      dispatch(addAllMovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
  };

  // Use useEffect to call the fetchMovies when the hook is used
  useEffect(() => {
    getHorrorMovies(); // Call the fetch function when the component mounts
  }, []); // Depend on the URL so the hook will refetch if the URL changes
};

export default useHorrorMovies;
