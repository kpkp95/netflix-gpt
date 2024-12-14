import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
