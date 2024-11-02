import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.allMovies);
  console.log(movies.length);
  if (!movies || movies.length === 0) return; // Handle case where there are no movies
  const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 100));

  const mainMovies = movies[randomIndex];
  const { title, overview, id } = mainMovies;
  console.log("Movie ID in MainContainer:", id); // Log the ID here
  return (
    <div>
      <VideoTitle title={title} overview={overview} />

      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
