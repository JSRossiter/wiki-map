"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/profile", (req, res) => {
    let templateVars = { username: req.session.username };
    res.render(/*profile*/, templateVars);
  });

  router.get("/profile/favorites", (req, res) => {
    // get user favorites to display on profile page
  });

  router.get("/profile/contributions", (req, res) => {
    // get user contributions to display on profile page
  });

  router.post("/profile/favorites/:list_title", (req, res) => {
    // create/remove favorite
  });

  return router;
};
