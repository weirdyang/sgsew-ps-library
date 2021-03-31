const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
const { config } = require('../config/data/mongodb');

function bookController(bookService, nav) {
  function middleware(req, res, next) {
    if (req.user) {
      // if there's a user
      // continue
      next();
    } else {
      res.redirect('/');
    }
  }
  function getIndex(req, res) {
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
  }

  function getById(req, res) {
    const { id } = req.params;
    (async function getMongo() {
      let client;
      try {
        client = await MongoClient.connect(config.url);
        debug('connected to mongodb');

        const db = client.db(config.databaseName);

        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });

        book.details = await bookService.getBookById(book.bookId);
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
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
