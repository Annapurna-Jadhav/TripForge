import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound; 