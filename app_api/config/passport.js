const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// The admin SPA logs in with email and password, so email is used as the
// Passport username field for the local strategy.
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username.toLowerCase() }).exec();

      if (!user) {
        return done(null, false, { message: 'Incorrect email address.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
