const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied',
        errors: { auth: 'Authentication required' }
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request
    req.user = {
      userId: decoded.userId
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
      errors: { auth: 'Invalid authentication token' }
    });
  }
};

module.exports = auth; 