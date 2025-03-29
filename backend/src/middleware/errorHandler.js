const { handleError } = require('../utils/helpers');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json(handleError(new Error(messages.join(', '))));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json(handleError(new Error('Duplicate field value entered')));
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(handleError(new Error('Invalid token')));
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(handleError(new Error('Token expired')));
  }

  // Default error
  res.status(500).json(handleError(new Error('Internal server error')));
};

module.exports = errorHandler; 