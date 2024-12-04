import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTopRatedTVSeries from "../hooks/useTopRatedTVSeries";
import useAiringTodayShows from "../hooks/useAiringTodayShows";
import useCrimeShows from "../hooks/useCrimeShows";
import useHorrorMovies from "../hooks/useHorrorMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import useTrailer from "../hooks/useTrailer";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  useTopRatedMovies();
  useTopRatedTVSeries();
  useAiringTodayShows();
  useCrimeShows();
  useHorrorMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
