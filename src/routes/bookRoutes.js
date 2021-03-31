const express = require('express');
// const { MongoClient, ObjectID } = require('mongodb');
// const debug = require('debug')('app:bookRoutes');
// const { config } = require('../config/data/mongodb');
const bookService = require('../services/bookService');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);
  return bookRouter;
}

module.exports = router;
