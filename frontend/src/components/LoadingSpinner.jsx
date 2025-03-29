import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner; 