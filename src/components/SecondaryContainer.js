import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("SecondaryContainer", movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-60 pl-12 relative z-20">
          <MoviesList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MoviesList
            title={"Top Rated Movies"}
            movies={movies?.topRatedMovies}
          />
          <MoviesList title={"Horror Movies"} movies={movies?.horrorMovies} />
          <MoviesList
            title={"Top Rated TV"}
            movies={movies?.topRatedTVSeries}
          />
          <MoviesList
            title={"Airing Today"}
            movies={movies?.airingTodayShows}
          />
          <MoviesList title={"Crime Shows"} movies={movies?.crimeShows} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
