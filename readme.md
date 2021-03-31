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