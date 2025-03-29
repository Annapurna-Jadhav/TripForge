const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Get all trips for a user
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.userId });
    res.json({
      success: true,
      data: trips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trips',
      errors: { server: 'An error occurred while fetching trips' }
    });
  }
});

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const { name, destinations, startDate, endDate } = req.body;
    
    const trip = new Trip({
      name,
      destinations,
      startDate,
      endDate,
      user: req.user.userId
    });

    await trip.save();
    
    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating trip',
      errors: { server: 'An error occurred while creating the trip' }
    });
  }
});

// Get a single trip
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trip',
      errors: { server: 'An error occurred while fetching the trip' }
    });
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating trip',
      errors: { server: 'An error occurred while updating the trip' }
    });
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting trip',
      errors: { server: 'An error occurred while deleting the trip' }
    });
  }
});

module.exports = router; 