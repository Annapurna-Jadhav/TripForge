const Joi = require('joi');

const destinationSchema = Joi.object({
  city: Joi.string().required().trim(),
  country: Joi.string().required().trim(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required()
});

const budgetSchema = Joi.object({
  total: Joi.number().required().min(0),
  breakdown: Joi.object({
    accommodation: Joi.number().min(0),
    transportation: Joi.number().min(0),
    activities: Joi.number().min(0),
    food: Joi.number().min(0)
  })
});

const createTripSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(100),
  destinations: Joi.array().items(destinationSchema).min(1).required(),
  budget: budgetSchema.required(),
  status: Joi.string().valid('planned', 'in-progress', 'completed', 'cancelled'),
  notes: Joi.string().trim().max(1000)
});

const updateTripSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100),
  destinations: Joi.array().items(destinationSchema).min(1),
  budget: budgetSchema,
  status: Joi.string().valid('planned', 'in-progress', 'completed', 'cancelled'),
  notes: Joi.string().trim().max(1000)
}).min(1); // At least one field must be provided for update

module.exports = {
  createTripSchema,
  updateTripSchema
}; 