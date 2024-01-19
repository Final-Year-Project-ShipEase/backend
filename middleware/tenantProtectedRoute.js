const jwt = require('jsonwebtoken');
const { Tenant } = require('../models');

const secretKey = 'SHIPEASE';

// Middleware to verify the access token
const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired access token' });
  }
};

module.exports = {
  verifyAccessToken,
};
