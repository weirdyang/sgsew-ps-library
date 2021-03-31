# before running

## Install packages

`npm install`

## Set database

Navigate to `src/config/data/mongodb.js`

```javascript
const mongodbConfig = {
  url: '<connectionstring>',
  databaseName: '<database name>',
};
```
## Run

`npm run start`

### Note

The bookservice will only work for the first two books - `Fantastic Mr Fox` and `More Spaghetti I say`. if you wish to add more, go to `https://openlibrary.org/`, and and update `adminRoutes.js` with the new books and bookId.