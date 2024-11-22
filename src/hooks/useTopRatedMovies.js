import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies, addAllMovies } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useTopRatedMovies = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  // Function to fetch movies data

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON
      console.log("useTopRatedMovies", json.results);
      dispatch(addTopRatedMovies(json.results)); // Dispatch the movie data to Redux
      dispatch(addAllMovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
  };
  useEffect(() => {
    if (!topRatedMovies || topRatedMovies.length === 0) {
      getTopRatedMovies(); // Call the fetch function when the component mounts if no data exists
    }
  }, [topRatedMovies]);
};

export default useTopRatedMovies;
