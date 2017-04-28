"use strict";

const express = require('express');
const router  = express.Router();
const authenticateUser = require("./route-helpers");

module.exports = (knex) => {

  const dbInsert = require("../db/insert-tables")(knex);
  const dbGet = require("../db/query-db")(knex);

  router.get("/", (req, res) => {
    let templateVars = { username: req.session.username };
    res.render("profile", templateVars);
  });

  router.get("/favorites", authenticateUser, (req, res) => {
    res.body.favorites = dbGet.getFavoriteLists(req.session.username); // ***Update function name?
  });

  router.get("/contributions", authenticateUser, (req, res) => {
    res.body.contributions = dbGet.getContributions(req.session.username); // ***Update function name?
  });

  router.post("/favorites/:list_title", authenticateUser, (req, res) => {
    // create/remove favorite
  });

  return router;
};
