import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const TripCard = ({ trip }) => {
  const { _id, title, destinations, budget, status } = trip;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'planned' ? 'bg-blue-100 text-blue-800' :
            status === 'in-progress' ? 'bg-green-100 text-green-800' :
            status === 'completed' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {destinations.map((dest, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>{dest.city}, {dest.country}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(dest.startDate)} - {formatDate(dest.endDate)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-lg font-semibold text-gray-800">${budget.total}</p>
            </div>
            <Link
              to={`/trips/${_id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard; 