import React from "react";
import Header from "./Header";

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
  const { loading, error, loadMore } = useFetchBrowseData();
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
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
        <React.Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <MainContainer />
            <SecondaryContainer />
          </ErrorBoundary>
        </React.Suspense>
      )}{" "}
      {loading && <Loader />}
    </div>
  );
};

export default Browse;
