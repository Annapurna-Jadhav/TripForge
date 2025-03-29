const { handleError } = require('../utils/helpers');

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json(handleError(new Error(error.details[0].message)));
      }
      next();
    } catch (error) {
      res.status(400).json(handleError(error));
    }
  };
};

module.exports = validateRequest; 