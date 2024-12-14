import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    crimeShows: [],
    topRatedMovies: [],
    topRatedTVSeries: [],
    airingTodayShows: [],
    horrorMovies: [],
    trailerVideo: null,
    loading: false,
    error: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload]; // Append results
    },
    addMoviesToCategory: (state, action) => {
      const { category, movies } = action.payload;
      if (state[category]) {
        const uniqueMovies = movies.filter(
          (movie) =>
            !state[category].some(
              (existingMovie) => existingMovie.id === movie.id
            )
        );
        state[category] = [...state[category], ...uniqueMovies];
      }
    },
    addHorrorMovies: (state, action) => {
      state.horrorMovies = [...state.horrorMovies, ...action.payload];
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = [...state.topRatedMovies, ...action.payload];
    },
    addTopRatedTVSeries: (state, action) => {
      state.topRatedTVSeries = [...state.topRatedTVSeries, ...action.payload];
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addCrimeShows: (state, action) => {
      state.crimeShows = [...state.crimeShows, ...action.payload];
    },
    addAiringTodayShows: (state, action) => {
      state.airingTodayShows = [...state.airingTodayShows, ...action.payload];
    },
    fetchTrailerStart(state) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  fetchTrailerStart,
  addTrailerVideo,
  addTopRatedMovies,
  addTopRatedTVSeries,
  addAiringTodayShows,
  addCrimeShows,
  addHorrorMovies,
  addMoviesToCategory,
} = movieSlice.actions;
export default movieSlice.reducer;
