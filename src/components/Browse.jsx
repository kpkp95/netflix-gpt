import React from "react";
import Header from "./Header";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";
import useFetchBrowseData from "../hooks/useFetchBrowseData";
import Loader from "./Loader"; // Import the custom loader
import ErrorBoundary from "./ErrorBoundary"; // Import the error boundary

// Lazy load components
const MainContainer = React.lazy(() => import("./MainContainer"));
const SecondaryContainer = React.lazy(() => import("./SecondaryContainer"));
const GptSearch = React.lazy(() => import("./GptSearch"));

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { loading, error } = useFetchBrowseData();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      <Header />
      {error && <div className="text-red-500 text-center">{error}</div>}
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <React.Suspense fallback={<Shimmer />}>
          <ErrorBoundary>
            <MainContainer />

            <SecondaryContainer />
          </ErrorBoundary>
        </React.Suspense>
      )}
    </div>
  );
};

export default Browse;
