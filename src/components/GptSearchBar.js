import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constant"; // API options

const GptSearchBar = () => {
  const searchText = useRef(null);
  const languageKey = useSelector((store) => store.config.lang);

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

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only give me names of 5 movies, comma-separated, like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya.`;

    try {
      const gptResult = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptResponse = gptResult.choices[0]?.message?.content;
      console.log("GPT Response:", gptResponse.choices);

      if (!gptResponse) {
        alert("GPT returned no results. Please try again.");
        return;
      }
      // Parse movie names from GPT response
      const gptMoviesList = gptResponse.split(",").map((movie) => movie.trim());
      console.log("GPT Suggested Movies:", gptMoviesList);

      const promiseArray = gptMoviesList.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[languageKey].gptSearchPlaceHolder}
        />
        <button
          className="m-4 py-2 px-4 col-span-3 bg-red-600  text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
