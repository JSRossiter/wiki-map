"use strict";

const express = require("express");
const router  = express.Router();
const authenticateUser = require("./route-helpers");

module.exports = (knex) => {

  const dbInsert = require("../db/insert-tables")(knex);
  const dbGet = require("../db/query-db")(knex);

  router.get("/", (req, res) => {
    dbGet.getLists().then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      console.error(error);
    });
  });

  router.post("/new", authenticateUser, (req, res) => {
    dbInsert.insertList(req.body.title);
    let list_id = dbGet.getListId; // ***Update function?
    // need to query list_id from list that was just inserted
    res.redirect = ("/lists/" + list_id);
  });

  router.get("/:list_id", (req, res) => {
    let templateVars = {
      username: req.session.username,
      list: dbGet.getListTitleById, // ***Update function?
      list_id: dbGet.getListId // ***Update function?
    };
    res.render("map", templateVars);
  });

  router.get("/:list_id/points", (req, res) => {
    dbGet.getPoints(req.params.list_id).then(data => {
      res.json(data);
    });

  });

  return router;
};
