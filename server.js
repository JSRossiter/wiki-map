'use strict';

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || 'development';

const bodyParser    = require('body-parser');
const cookieSession = require('cookie-session');
const express       = require('express');
const sass          = require('node-sass-middleware');
const app           = express();

const knexConfig    = require('./knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');

// Seperated Routes for each Resource
const profileRoutes = require('./routes/profile');
const listRoutes    = require('./routes/lists');
const pointRoutes   = require('./routes/points');

// Helper functions
const routeHelpers  = require('./routes/route-helpers');
const dbInsert      = require('./db/insert-tables')(knex);
const dbGet         = require('./db/query-db')(knex);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000
  // 24 hours
}));

app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static('public'));

// Mount all resource routes
app.use('/profile', profileRoutes(knex));
app.use('/lists', listRoutes(knex));
app.use('/points', pointRoutes(knex));


app.get('/', (req, res) => {
  console.log('getting home ...');
  let templateVars = { username: req.session.username };
  res.render('index', templateVars);
});

app.post('/login', (req, res, next) => {
  dbGet.getUserId(req.body.username).then(data => {
    if (!data.length) {
      return next({ status: 422, message: 'Username does not exist' })
    } else {
      req.session.user_id = data[0].id;
      req.session.username = req.body.username;
      res.status(200).send();
    }
  }).catch(error => {
    next({ status: 500, message: 'Database error' });
  });
});

app.post('/register', (req, res, next) => {
  dbGet.getUserId(req.body.username).then(data => {
    if (data.length) {
      return next({ status: 409, message: 'This username is already taken' })
    } else {
      dbInsert.insertUser(req.body.username).then(data => {
        req.session.user_id = data[0].id;
        req.session.username = req.body.username;
        res.status(200).send();
      }).catch(error => {
        next({ status: 500, message: 'Database error' });
      });
    }
  });
});

app.post('/logout', (req, res, next) => {
  req.session = null;
  res.status(200).send();
});

app.use('/', (error, req, res, next) => {
  console.log(error);
  error.path = req.path;
  error.username = req.session.username;
  res.status(error.status).send(error);
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
