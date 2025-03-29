import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to NomadNexus
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your intelligent travel planning companion
      </p>
      <div className="space-x-4">
        <Link
          to="/planner"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Start Planning
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home; 