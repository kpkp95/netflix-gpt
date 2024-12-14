import axios from "axios";
const endpointMap = {
  // Movies
  nowPlayingMovies: "/movie/now_playing",
  topRatedMovies: "/movie/top_rated",
  horrorMovies: "/discover/movie?with_genres=27",

  // TV Series
  topRatedTVSeries: "/tv/top_rated",
  airingTodayShows: "/tv/airing_today",
  crimeShows: "/discover/tv?with_genres=80", // Genre ID for Crime TV
};
// API Base URL and Token
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`,
  },
};

// Function to Fetch Movies for Infinite Scrolling
export const fetchInfiniteScrollMovies = async (category, page = 1) => {
  try {
    const endpoint = endpointMap[category]; // Use updated endpointMap
    if (!endpoint) throw new Error(`Invalid category: ${category}`);

    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.get(url, {
      headers: API_OPTIONS.headers,
      params: { page },
    });

    return response.data; // Return results
  } catch (error) {
    console.error("Failed to fetch content:", error.response || error.message);
    throw error;
  }
};

// Function to Fetch Cast Members
export const fetchCastMembers = async (id, type = "movie") => {
  try {
    const url = `${API_BASE_URL}/${type}/${id}/credits`; // Dynamically determine "movie" or "tv"
    const response = await axios.get(url, { headers: API_OPTIONS.headers });

    return response.data.cast.slice(0, 5); // Return the first 5 cast members
  } catch (error) {
    console.error(
      "Failed to fetch cast members:",
      error.response || error.message
    );
    throw error;
  }
};
