const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Validate a Bearer token before allowing a request to change trip data.
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is required.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'A valid Bearer token is required.' });
  }

  try {
    req.auth = jwt.verify(parts[1], process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or has expired.' });
  }
};

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
