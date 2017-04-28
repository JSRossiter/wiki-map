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

  router.get("/favorites", (req, res) => {
    console.log("getting favs ...");
    if (req.session.user_id) {
      dbGet.getFavoriteLists(req.session.user_id).then(data => {
        console.log("query results from getFavoriteLists function:\n", data); //***Delete after testing
        res.json(data);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      res.json([]);
    }
  });

  router.get("/contributions", authenticateUser, (req, res) => {
    dbGet.getContributions(req.session.user_id).then(data => {
      console.log("query results from getContributions function:\n", data); //***Delete after testing
      res.json(data);
    })
    .catch(error => {
      console.error(error);
    });
  });

  router.post("/favorites/:list_title", authenticateUser, (req, res) => {
    // create/remove favorite
  });

  return router;
};
