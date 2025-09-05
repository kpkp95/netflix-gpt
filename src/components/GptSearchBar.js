import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { askOpenAI } from "../utils/askOpenAI";
import { API_OPTIONS } from "../utils/constant"; // API options
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const languageKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  // Helper: Check if query is specific to a movie
  const isDirectMovieQuery = (query) => {
    const genericTerms = [
      "movie",
      "movies",
      "film",
      "films",
      "genre",
      "comedy",
      "romantic",
    ];
    return !genericTerms.some((term) => query.toLowerCase().includes(term));
  };

  //seach the movie in tmdb
  const searchMovieTMDB = async (movieName) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movieName +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON
      console.log("searchMovieTMDB:", movieName, json.results);
      return json.results || [];
      // Set results flag to true
      // Dispatch the movie data to Redux
    } catch (error) {
      console.error(`Error searching for movie "${movieName}":`, error); // Log any errors
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    console.log("Search query:", query);

    if (!query) {
      alert("Please enter a search query.");
      return;
    }
    // Attempt a direct search in TMDB
    if (isDirectMovieQuery(query)) {
      try {
        const directSearchResults = await searchMovieTMDB(query);
        if (directSearchResults.length > 0) {
          console.log("Direct Search Results:", directSearchResults);
          dispatch(
            addGptMovieResult({
              gptMovieNames: [query], // Treat as a single GPT suggestion
              tmdbMovieNames: [directSearchResults], // Wrap in an array for consistency
            })
          );

          return; // Exit here for direct search
        }
      } catch (error) {
        console.error("Direct search failed:", error);
      }
    }

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only give me names of 5 movies, comma-separated, like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya.`;

    try {
      const gptResponse = await askOpenAI(gptQuery);
      console.log("GPT Response:", gptResponse);

      if (!gptResponse) {
        alert("GPT returned no results. Please try again.");
        return;
      }

      // Parse movie names from GPT response
      const gptMoviesList = gptResponse
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
      console.log("GPT Suggested Movies:", gptMoviesList);

      const tmdbResults = await Promise.all(
        gptMoviesList.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addGptMovieResult({
          gptMovieNames: gptMoviesList,
          tmdbMovieNames: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="pt-[45%]  sm:pt-[25%] md:pt-[21%]  xs:pt-[40%] flex justify-center  lg:pt-[20%] xl:pt-[11%] ">
      <form
        className="w-full sm:w-[65%] md:w-[60%] lg:w-[55%] xl:w-[50%] bg-black grid grid-cols-12 rounded-xl max-[399px]:h-[80px] max-[399px]:p-2  max-[399px]:m-2 xs:m-2 sm:m-0 sm:p-0 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4  col-span-9 text-black rounded-lg  xs:placeholder:text-sm max-[399px]:placeholder:text-xs md:placeholder:text-base  max-[399px]:m-2 max-[399px]:p-2"
          placeholder={lang[languageKey].gptSearchPlaceHolder}
        />
        <button
          className="m-4   max-[399px]:py-0 col-span-3 bg-red-600  text-white rounded-lg  sm:text-sm text-xs md:text-base max-[399px]:m-2"
          onClick={handleGptSearchClick}
        >
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
