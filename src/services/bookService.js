const axios = require('axios');
const debug = require('debug')('app:bookService');

function goodReadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      debug(bookId);
      axios.get(`https://openlibrary.org/works/${bookId}.json`)
        .then((response) => {
          if (response.status !== 200) {
            reject(response);
            debug(response);
          } else {
            resolve({ description: response.data.description });
          }
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
      // resolve({ description: 'our description ' });
    });
  }
  return { getBookById };
}
module.exports = goodReadsService();
