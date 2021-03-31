const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const { config } = require('../config/data/mongodb');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      // if there's a user
      // continue
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/').get((req, res) => {
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';
    (async function getMongo() {
      let client;
      try {
        client = await MongoClient.connect(config.url);
        debug('connected to mongodb');

        const db = client.db(config.databaseName);

        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render('bookListView', {
          nav,
          title: 'Library',
          books,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    (async function getMongo() {
      let client;
      try {
        client = await MongoClient.connect(config.url);
        debug('connected to mongodb');

        const db = client.db(config.databaseName);

        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });

        debug(book);

        res.render('bookView', {
          nav,
          title: 'Library',
          book,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  return bookRouter;
}

module.exports = router;
