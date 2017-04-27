"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require('cookie-session');
const sass          = require("node-sass-middleware");
const app           = express();

const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');

// Seperated Routes for each Resource
const profileRoutes = require("./routes/profile");
const listRoutes    = require("./routes/lists");
const pointRoutes   = require("./routes/points");

// Helper functions to query db
const dbHelper = require("./db/insert-tables"); //***Update const/file names?

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  keys: ["secret"],
  maxAge: 24 * 60 * 60 * 1000
  // 24 hours
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/profile", profileRoutes(knex));
app.use("/lists", listRoutes(knex));
app.use("/points", pointRoutes(knex));


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/");
});

app.post("/register", (req, res) => {
  // add user to database
  const username = req.body.username;
  dbHelper.insertUser(username); //***Update this function?
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

// handle 404 errors
app.use((req, res) => {
  res.status(404).send("404: Page not Found");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
