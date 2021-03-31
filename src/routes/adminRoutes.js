const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'Fantastic Mr Fox',
    genre: 'Fiction',
    author: 'Roald Dahl',
    read: false,
    bookId: 'OL45883W',
  },
  {
    title: 'More Spaghetti I Say',
    genre: 'Fiction',
    author: 'Rita Golden Gelman',
    read: false,
    bookId: 'OL15236127W',
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false,
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false,
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false,
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false,
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
  },
];
function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function getMongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to mongodb');

        const db = client.db(dbName);

        const reply = await db.collection('books').insertMany(books);
        res.json(reply);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
