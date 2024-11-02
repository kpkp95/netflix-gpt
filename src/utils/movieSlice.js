import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: [],
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
      state.nowPlayingMovies = action.payload;
    },
    addAllMovies: (state, action) => {
      const combinedMovies = [...state.allMovies, ...action.payload];

      // Filter out duplicates based on the movie ID
      state.allMovies = combinedMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );
    },
    addHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addTopRatedTVSeries: (state, action) => {
      state.topRatedTVSeries = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addCrimeShows: (state, action) => {
      state.crimeShows = action.payload;
    },
    addAiringTodayShows: (state, action) => {
      state.airingTodayShows = action.payload;
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
  addAllMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
