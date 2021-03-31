const passport = require('passport');
const debug = require('debug')('app:passport');

require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores user in session
  passport.serializeUser((user, done) => {
    debug(user);
    done(null, user);
  });

  // retrieve user from session
  passport.deserializeUser((user, done) => {
    // finds user in database
    debug(user, 'deserialize');
    done(null, user);
  });
};
