import { useState } from "react";
import { API_OPTIONS } from "../utils/constant";

export const useTMDBSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovieTMDB = async (movieName) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movieName
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.results);
      return data.results || [];
    } catch (err) {
      setError(`Error searching for movie "${movieName}": ${err.message}`);
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { searchMovieTMDB, isLoading, error };
};
