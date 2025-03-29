const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { createTripSchema, updateTripSchema } = require('../validations/tripValidation');
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');

// All routes require authentication
router.use(auth);

// Trip routes with validation
router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', validateRequest(createTripSchema), createTrip);
router.put('/:id', validateRequest(updateTripSchema), updateTrip);
router.delete('/:id', deleteTrip);

module.exports = router; 