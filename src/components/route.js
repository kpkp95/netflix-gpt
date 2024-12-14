import React from "react";
import Loader from "./Loader";

const Login = React.lazy(() => import("./Login"));
const Browse = React.lazy(() => import("./Browse"));
const NotFound = React.lazy(() => import("./NotFound"));

const MoviePlay = React.lazy(() => import("./MoviePlay"));
const routes = [
  {
    path: "/",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    path: "/browse",
    element: (
      <React.Suspense fallback={<Loader />}>
        <Browse />
      </React.Suspense>
    ),
  },
  {
    path: "/movie/play/:movieId",
    element: (
      <React.Suspense fallback={<Loader />}>
        <MoviePlay />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<Loader />}>
        <NotFound />
      </React.Suspense>
    ),
  },
];

export default routes;
