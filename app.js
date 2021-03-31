const express = require('express');
const chalk = require('chalk');
// 'app' to tell debug where we are
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const sql = require('mssql');

const nav = [
  { link: '/books', title: 'Bookssssss' },
  { link: '/authors', title: 'Authors' },
  { link: '/auth/logout', title: 'Log out' },
];

const app = express();

const port = process.env.PORT || 3000;

// const config = {
//   user: 'library',
//   password: 'P@ssw0rd!',
//   server: 'sguspslibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
//   database: 'PSLibrary',
//   options: {
//     encrypt: true,
//   },
// };

// sql.connect(config).catch((err) => {
//   debug(err);
// });

// middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use((req, res, next) => {
  debug('my middleware');
  // need to call next();
  // to pass the request to the
  // next component in the pipeline
  next();
});

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

const bootstrapCss = path.join(
  __dirname,
  'node_modules',
  'bootstrap',
  'dist',
  'css',
);
app.use('/css', express.static(bootstrapCss));

const bootstrapJs = path.join(
  __dirname,
  'node_modules',
  'bootstrap',
  'dist',
  'js',
);
app.use('/js', express.static(bootstrapJs));

const jqueryJs = path.join(__dirname, 'node_modules', 'jquery', 'dist');
app.use('/js', express.static(jqueryJs));

const views = path.join(__dirname, 'src', 'views');
app.set('views', views);

// pug set up
// app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//   res.render('index', {
//     list: ['a', 'b'],
//   });
// });
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
// ejs set up
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    nav,
    title: 'library',
  });
});

// prefer arrow functions over function callbacks
// app.get('/', (reqq, res) => {
//   // bad, use path
//   // res.sendFile(__dirname + '/views/index.html');
//   // correct
//   const index = path.join(__dirname, 'views', 'index.html');
//   res.sendFile(index);
// });

app.listen(port, () => {
  debug(`istening on port rs ${chalk.green(port)}`);
});
