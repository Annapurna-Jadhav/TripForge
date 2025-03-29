const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destinations: [{
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  }],
  budget: {
    total: {
      type: Number,
      required: true
    },
    breakdown: {
      accommodation: Number,
      transportation: Number,
      activities: Number,
      food: Number
    }
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled'],
    default: 'planned'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
tripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for calculating total days
tripSchema.virtual('totalDays').get(function() {
  return this.destinations.reduce((total, dest) => {
    const days = Math.ceil((dest.endDate - dest.startDate) / (1000 * 60 * 60 * 24));
    return total + days;
  }, 0);
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip; 