import { useState } from "react";
import openai from "../utils/openAI";

export const useGPTSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGptMovies = async (query) => {
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only give me names of 5 movies, comma-separated.`;

    try {
      setIsLoading(true);
      const gptResult = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptResponse = gptResult.choices[0]?.message?.content;
      if (!gptResponse) {
        throw new Error("GPT returned no results.");
      }
      console.log(gptResponse.split(",").map((movie) => movie.trim()));
      return gptResponse.split(",").map((movie) => movie.trim());
    } catch (err) {
      setError(err.message || "Error fetching GPT response.");
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchGptMovies, isLoading, error };
};
