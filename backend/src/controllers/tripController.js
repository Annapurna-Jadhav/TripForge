const Trip = require('../models/Trip');
const { handleError, successResponse, validateRequiredFields } = require('../utils/helpers');

// Get all trips for a user
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.json(successResponse(trips));
  } catch (error) {
    res.status(500).json(handleError(error));
  }
};

// Get a single trip
const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json(handleError(new Error('Trip not found')));
    }

    res.json(successResponse(trip));
  } catch (error) {
    res.status(500).json(handleError(error));
  }
};

// Create a new trip
const createTrip = async (req, res) => {
  try {
    validateRequiredFields(req.body, ['title', 'destinations', 'budget']);

    const trip = new Trip({
      ...req.body,
      user: req.user.id
    });

    await trip.save();
    res.status(201).json(successResponse(trip, 'Trip created successfully'));
  } catch (error) {
    res.status(400).json(handleError(error));
  }
};

// Update a trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json(handleError(new Error('Trip not found')));
    }

    res.json(successResponse(trip, 'Trip updated successfully'));
  } catch (error) {
    res.status(400).json(handleError(error));
  }
};

// Delete a trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json(handleError(new Error('Trip not found')));
    }

    res.json(successResponse(null, 'Trip deleted successfully'));
  } catch (error) {
    res.status(500).json(handleError(error));
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip
}; 