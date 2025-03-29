import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Travel Expense
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/planner"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Trip Planner
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 