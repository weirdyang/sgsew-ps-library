const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const { config } = require('../config/data/mongodb');

const authRouter = express.Router();
function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    debug(req.body);
    // create user
    const { username, password } = req.body;

    (async function AddUser() {
      let client;
      try {
        client = await MongoClient.connect(config.url);
        debug('connected to server');
        // go to database
        const db = client.db(config.databaseName);
        // create table for users
        const col = db.collection('users');

        const user = { username, password };
        // insert user
        const { ops } = await col.insertOne(user);
        debug(ops);
        req.login(ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());

    // log user in
    // res.json(req.body);
  });
  authRouter
    .route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign in',
      });
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
      }),
    );

  authRouter.route('/logout').all((req, res, next) => {
    if (req.user) {
      req.logout(req.user);
    }
    res.redirect('/');
  });

  authRouter
    .route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        // if there's a user
        // continue
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
