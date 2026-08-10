const passport = require('passport');

const User = require('../models/user');

// POST /api/register
// Create a local admin user and return a JWT immediately after registration.
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({
      email: req.body.email.toLowerCase()
    }).exec();

    if (existingUser) {
      return res.status(409).json({
        message: 'A user with that email address already exists.'
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/login
// Delegate credential validation to Passport's local strategy.
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  return passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json(info || { message: 'Authentication failed.' });
    }

    const token = user.generateJWT();
    return res.status(200).json({ token });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
