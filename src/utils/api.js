import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3"; // API v4 base URL

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`,
  },
};

export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: API_OPTIONS.headers,
      params, // Additional query parameters
    });
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};
