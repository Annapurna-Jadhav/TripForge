const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/helpers');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json(handleError(new Error('No authentication token, access denied')));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(handleError(new Error('Token is not valid')));
  }
};

module.exports = { auth }; 