"use strict";

const express = require('express');
const router  = express.Router();
const profileHelper = require("../helpers/profile-helpers"); //***Update const/file names?

module.exports = (knex) => {

  router.get("/", (req, res) => {
    let templateVars = { username: req.session.username };
    res.render(profile, templateVars);
  });

  router.get("/favorites", (req, res) => {
    // get user favorites to display on profile page
    res.body.favorites = profileHelper.getFavorites; // ***Update function name?
  });

  router.get("/contributions", (req, res) => {
    // get user contributions to display on profile page
    res.body.contributions = profileHelper.getContributions; // ***Update function name?
  });

  router.post("/favorites/:list_title", (req, res) => {
    // create/remove favorite
  });

  return router;
};
