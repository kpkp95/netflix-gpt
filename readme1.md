# NETFLIX GPT

- create-react-app
- config tailwind
- Header
- routing
- LoginForm
- Sign Up
- Form Validation
- UseRef
- firebase setup
  -deployment
  -create signUp in firebase
  -implement signin and sign up
  -add redux tool kit created redux store with user slice

# features

-Login/SignUp
--Sign In/Sign Up Form
--Redirect to browse page after login

-Browse (after Auth)
--Header
--Main Movie
---Trailer in bg
---title and Description
---Movie Suggestions
----Movie List

-NetflixGPT
-search Bar
-movie suggestion

import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
const navigate = useNavigate();

const handleMoreInfo = () => {
navigate(`/movie/${movie.id}`);
};

const handlePlay = () => {
navigate(`/movie/play/${movie.id}`);
};

return (
<div className="movie-card">
<img
src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
alt={movie.title}
className="w-full h-auto rounded"
/>
<h2 className="text-center">{movie.title}</h2>
<div className="flex gap-2 mt-2 justify-center">
<button onClick={handleMoreInfo} className="bg-gray-500 px-4 py-2 rounded text-white">
More Info
</button>
<button onClick={handlePlay} className="bg-blue-500 px-4 py-2 rounded text-white">
Play
</button>
</div>
</div>
);
};

export default MovieCard;

import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMoviesSuggestions = () => {
const gpt = useSelector((store) => store.gpt);
const { gptMovieNames, tmdbMovieNames } = gpt;

// Ensure suggestions are shown only after a search
if (!gptMovieNames || gptMovieNames.length === 0 || !tmdbMovieNames) {
return null;
}
// Show "No suggestions available" only if a search was performed but no results exist
if (
gptMovieNames.length > 0 &&
tmdbMovieNames.every((movies) => movies.length === 0)
) {
return (

<div className="p-4 m-4 bg-black text-white bg-opacity-85">
<p>No suggestions available. Please try again later.</p>
</div>
);
}

return (

<div
      className="p-4 m-4 bg-black text-white bg-opacity-85"
      aria-label="GPT Movie Suggestions"
    >
{gptMovieNames.map((movieName, index) => (
<MoviesList
key={movieName}
title={movieName}
movies={tmdbMovieNames[index] || []}
/>
))}
</div>
);
};

export default GptMoviesSuggestions;

import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import { BACKGROUND_IMG_URL } from "../utils/constant";

const GptSearch = () => {
return (
<>

<div className="fixed inset-0 -z-20">
<img
          src={BACKGROUND_IMG_URL}
          alt="bg"
          className="h-screen w-screen object-cover "
        />
</div>
<div>
<GptSearchBar />
<GptMoviesSuggestions />
</div>
</>
);
};

export default GptSearch;

import React, { useRef, useState } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { useMovieSuggestions } from "../hooks/useMovieSuggestion";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
const searchText = useRef(null);
const [error, setError] = useState(""); // Tracks input validation error
const [hasSearched, setHasSearched] = useState(false); // Tracks if a search was made
const languageKey = useSelector((store) => store.config.lang);
const dispatch = useDispatch();

const {
fetchMovieSuggestions,
suggestions,
isLoading,
error: fetchError,
} = useMovieSuggestions();

const handleGptSearchClick = async () => {
const query = searchText.current?.value.trim();
if (!query || query.length < 3 || /^[^a-zA-Z]+$/.test(query)) {
setError(
"Please enter a meaningful search query with at least 3 characters."
);
return;
}

    setError(""); // Clear any previous validation error
    setHasSearched(true); // Mark that a search was performed
    await fetchMovieSuggestions(query);
    dispatch(
      addGptMovieResult({
        gptMovieNames: suggestions.gptMovies || [],
        tmdbMovieNames: suggestions.tmdbResults || [],
      })
    );

};

// Clear input and reset states
const handleClear = () => {
if (searchText.current) searchText.current.value = "";
searchText.current?.focus();
setError("");
setHasSearched(false);
dispatch(addGptMovieResult({ gptMovieNames: [], tmdbMovieNames: [] }));
};

return (

<div className="pt-[45%]  sm:pt-[25%] md:pt-[21%]  xs:pt-[40%] flex justify-center  lg:pt-[20%] xl:pt-[11%] flex-col items-center">
<div className="w-[98%] sm:w-[65%] md:w-[60%] lg:w-[55%] xl:w-[55%]   rounded-xl py-0 px-3 max-[399px]:h-[110px]  max-[399px]:m-2 xs:m-1 sm:m-0 sm:py-1 sm:px-4  ">
<form
className="flex rounded-lg justify-center shadow-sm"
onSubmit={(e) => e.preventDefault()} >
<input
            ref={searchText}
            type="text"
            className="flex-1 py-3 px-2 xs:px-4 block  border border-gray-300 shadow-sm rounded-s-md text-xs xs:text-sm focus:z-10 dark:bg-white dark:border-neutral-700 dark:text-black-400 "
            placeholder={lang[languageKey].gptSearchPlaceHolder}
            aria-label="Search for movies or genres"
          />
<button
className={`py-3 xs:px-4 px-2 border font-normal xs:font-medium text-black shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm 
              ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "dark:bg-red-600 dark:hover:bg-red-800 dark:border-neutral-700 dark:text-white dark:hover:text-white"
              }`}
onClick={handleGptSearchClick}
disabled={isLoading} >
{isLoading ? "Searching..." : lang[languageKey].search}
</button>
<button
            type="button"
            className="-ms-px py-3 xs:px-4 px-2  border rounded-e-md    text-black shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-blue-600 dark:hover:bg-blue-800 dark:border-neutral-700 dark:text-white dark:hover:text-white"
            onClick={handleClear}
          >
Clear
</button>
</form>
</div>
<div className="w-full sm:w-[65%] md:w-[60%] lg:w-[55%] xl:w-[52%] mt-2">
{/_ Display input validation error _/}
{error && (
<div className="p-4 m-4 bg-black text-white bg-opacity-85">
<p>{error}</p>
</div>
)}

        {/* Display fetch error */}
        {fetchError && (
          <div className="p-4 m-4 bg-black text-white bg-opacity-85">
            <p>
              {fetchError.message ||
                "An unexpected error occurred. Please try again."}
            </p>
          </div>
        )}
      </div>
    </div>

);
};

export default GptSearchBar;
