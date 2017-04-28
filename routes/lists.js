"use strict";

const express = require("express");
const router  = express.Router();
const authenticateUser = require("./route-helpers");

module.exports = (knex) => {

  const dbInsert = require("../db/insert-tables")(knex);
  const dbGet = require("../db/query-db")(knex);

  router.get("/", (req, res) => {
    // get list of lists
    res.body.lists = dbGet.getLists; // ***Update function?
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

  router.get("/:list_title/points", (req, res) => {
    // how can this pass on the list_id?
    res.body.points = dbGet.getPoints(list_id); // ***Update function?
  });

  return router;
};
