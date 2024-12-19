import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFromAPI } from "../utils/api";
import {
  addNowPlayingMovies,
  addHorrorMovies,
  addTopRatedMovies,
  addTopRatedTVSeries,
  addCrimeShows,
  addAiringTodayShows,
} from "../utils/movieSlice";

const useFetchBrowseData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        nowPlaying,
        topRated,
        topRatedTV,
        horrorMovies,
        crimeSeries,
        airingTodayShows,
      ] = await Promise.all([
        fetchFromAPI(`/movie/now_playing?page=${page}`),
        fetchFromAPI(`/movie/top_rated?page=${page}`),
        fetchFromAPI(`/tv/top_rated?page=${page}`),
        fetchFromAPI(
          `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=27`
        ),
        fetchFromAPI(
          `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=80`
        ),
        fetchFromAPI(`/tv/airing_today?page=${page}`),
      ]);

      // Dispatch results to Redux
      dispatch(addNowPlayingMovies(nowPlaying.results));
      dispatch(addTopRatedMovies(topRated.results));
      dispatch(addTopRatedTVSeries(topRatedTV.results));
      dispatch(addHorrorMovies(horrorMovies.results));
      dispatch(addCrimeShows(crimeSeries.results));
      dispatch(addAiringTodayShows(airingTodayShows.results));
    } catch (err) {
      console.error("Failed to fetch movie data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]); // Fetch movies when the page changes

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page
  };

  return { loading, error, loadMore };
};

export default useFetchBrowseData;
