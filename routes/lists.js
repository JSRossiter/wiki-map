"use strict";

const express = require("express");
const router  = express.Router();
const listHelper = require("/db/insert-tables");

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // get list of lists
    res.body.lists = listHelper.getAllLists; // ***Update function?
  });

  router.post("/new", (req, res) => {
    // (auth users only) add new list to database and redirect to that list map
    let title = req.body.title;
    listHelper.insertList(title);
    let list_id = listHelper.getList.list_id; // ***Update function?
    // need to query list_id from list that was just inserted
    res.redirect = ("/lists/" + list_id);
  });

  router.get("/:list_id", (req, res) => {
    // render map with point markers
    let list_title = listHelper.getListTitleById; // ***Update function?
    let templateVars = {
      username: req.session.username,
      list: list_title
    };
    res.render("map", templateVars);
  });

  router.get("/:list_title/points", (req, res) => {
    // return points for given list
    res.body.points = listHelper.getListPoints; // ***Update function?
  });

  return router;
};
