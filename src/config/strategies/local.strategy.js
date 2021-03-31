const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:localStrategy');
const { config } = require('../data/mongodb');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        (async function createOrLogin() {
          let client;
          try {
            client = await MongoClient.connect(config.url);
            debug('connected to server');
            // go to database
            const db = client.db(config.databaseName);
            // create table for users
            const col = db.collection('users');

            const user = await col.findOne({ username });

            if (user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            debug(error.stack);
          }
          client.close();
        }());
      },
    ),
  );
};
