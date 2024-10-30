import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    loading: false,
    error: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    fetchTrailerStart(state) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { addNowPlayingMovies, fetchTrailerStart, addTrailerVideo } =
  movieSlice.actions;
export default movieSlice.reducer;
