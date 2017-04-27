"use strict";

const express = require("express");
const router  = express.Router();
const listHelper = require("../helpers/list-helpers");

module.exports = (knex) => {

  router.get("/lists", (req, res) => {
    // get list of lists
    res.body.lists = listHelper.getAllLists; // ***Update function name?
  });

  router.post("/lists/new", (req, res) => {
    // add new list to database and redirect to that list map
    list_id = listHelper.createList.id; // ***Update function name?
    // I assume this function returns an object with list id, title, user_id
    res.redirect = ("/lists/" + list_id);
  });

  router.get("/lists/:list_id", (req, res) => {
    // render map with point markers
    res.render("map"); // ***Update ejs file name?
  });

  router.get("/lists/:list_title/points", (req, res) => {
    // return points for given list
    res.body.points = listHelper.getListPoints; // ***Update function name?
  });

  return router;
};
