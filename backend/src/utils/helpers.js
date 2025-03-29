// Error handling utility
const handleError = (error) => {
  console.error(error);
  return {
    success: false,
    message: error.message || 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? error : undefined
  };
};

// Success response utility
const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

// Validation utility
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  return true;
};

// Date formatting utility
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Price calculation utility
const calculatePrice = (basePrice, taxRate = 0.1) => {
  const tax = basePrice * taxRate;
  return {
    basePrice,
    tax,
    total: basePrice + tax
  };
};

module.exports = {
  handleError,
  successResponse,
  validateRequiredFields,
  formatDate,
  calculatePrice
}; 