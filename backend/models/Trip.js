const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Destination name is required'],
    trim: true
  },
  days: {
    type: Number,
    required: [true, 'Number of days is required'],
    min: [1, 'Must be at least 1 day']
  },
  activities: [{
    type: String,
    trim: true
  }]
});

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinations: [destinationSchema],
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validate that end date is after start date
tripSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

module.exports = mongoose.model('Trip', tripSchema); 