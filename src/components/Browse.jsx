import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTopRatedTVSeries from "../hooks/useTopRatedTVSeries";
import useAiringTodayShows from "../hooks/useAiringTodayShows";
import useCrimeShows from "../hooks/useCrimeShows";
import useHorrorMovies from "../hooks/useHorrorMovies";

const Browse = () => {
  useNowPlayingMovies();
  useTopRatedMovies();
  useTopRatedTVSeries();
  useAiringTodayShows();
  useCrimeShows();
  useHorrorMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
