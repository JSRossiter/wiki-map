"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/points/new", (req, res) => {
    // create new point
  });

  router.put("/points/edit/:point_id", (req, res) => {
    // edit point
  });

  router.delete("/points/:point_id", (req, res) => {
    // remove
  });

  return router;
};
