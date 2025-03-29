import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">{user?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user?.email || 'Not set'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <div className="space-y-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Change Password
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4">
                Edit Profile
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Travel Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Currency</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Travel Style</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Budget</option>
                  <option>Comfort</option>
                  <option>Luxury</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 