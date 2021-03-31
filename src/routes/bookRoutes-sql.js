const express = require('express');
const sql = require('mssql');
// const debug = require('debug')('app:bookeRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    (async function getBooks() {
      const request = new sql.Request();
      const { recordset } = await request.query('select * from books');
      // debug(recordset);
      res.render('bookListView', {
        nav,
        books: recordset,
        title: 'library',
      });
    }());
  });

  bookRouter
    .route('/:id')
    .all((req, res, next) => {
      (async function getSingleBook() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get(({ book }, res) => {
      res.render('bookView', {
        nav,
        book,
        title: 'library',
      });
    });
  return bookRouter;
}

module.exports = router;
