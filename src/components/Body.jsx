import React from "react";
import routes from "./route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter(routes);
  return (
    <div className="h-full w-full">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
