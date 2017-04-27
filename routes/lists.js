"use strict";

const express = require("express");
const router  = express.Router();
const listHelper = require("../helpers/list-helpers"); //***Update const/file names?

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // get list of lists
    res.body.lists = listHelper.getAllLists; // ***Update function?
  });

  router.post("/new", (req, res) => {
    // (auth users only) add new list to database and redirect to that list map
    let title = req.body.title;
    listHelper.insertList(title); // ***Update function?
    let list_id = listHelper.getList.list_id;
    res.redirect = ("/lists/" + list_id);
  });

  router.get("/:list_id", (req, res) => {
    // render map with point markers
    let templateVars = { list: "Best food in Vancouver"};
    res.render("map");
  });

  router.get("/:list_title/points", (req, res) => {
    // return points for given list
    res.body.points = listHelper.getListPoints; // ***Update function?
  });

  return router;
};
