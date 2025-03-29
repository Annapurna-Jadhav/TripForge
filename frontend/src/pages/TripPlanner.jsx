import React, { useState, useEffect } from 'react';

const TripPlanner = () => {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('trips');
    return savedTrips ? JSON.parse(savedTrips) : [];
  });
  
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTrip.name || !newTrip.destination) return;

    setTrips(prev => [...prev, { ...newTrip, id: Date.now() }]);
    setNewTrip({
      name: '',
      destination: '',
      startDate: '',
      endDate: '',
      budget: ''
    });
  };

  const handleDelete = (tripId) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Trip Planner</h1>
      
      {/* Add New Trip Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Trip Name</label>
            <input
              type="text"
              name="name"
              value={newTrip.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Summer Vacation"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              name="destination"
              value={newTrip.destination}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Paris, France"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newTrip.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={newTrip.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget</label>
            <input
              type="number"
              name="budget"
              value={newTrip.budget}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Trip
          </button>
        </form>
      </div>

      {/* Trip List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
        {trips.length === 0 ? (
          <p className="text-gray-500">No trips planned yet. Start by adding a trip above!</p>
        ) : (
          <div className="space-y-4">
            {trips.map(trip => (
              <div
                key={trip.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{trip.name}</h3>
                    <p className="text-gray-600">{trip.destination}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Dates: {trip.startDate} - {trip.endDate}</p>
                      {trip.budget && <p>Budget: ${trip.budget}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner; 