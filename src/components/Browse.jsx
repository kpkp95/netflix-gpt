import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import MoviesList from "./MoviesList";

/*
 -Main conatianer
   -Video Background
   -Video Title
  -Seconndary Container
    -Movielist  * n
     -card * n

 */

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <MoviesList />
    </div>
  );
};

export default Browse;
