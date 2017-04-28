"use strict";

const express = require('express');
const router  = express.Router();
const authenticateUser = require("./route-helpers");

module.exports = (knex) => {

  const dbHelpers = require("../db/insert-tables")(knex);

  router.post("/new", authenticateUser, (req, res) => {
    dbHelpers.insertPoint(
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.coords,
      req.body.list_id
    );
    res.status(200).send(); // ***Send point data?
  });

  router.put("/edit/:point_id", authenticateUser, (req, res) => {
    dbHelpers.editPoint(  //***Update this function?
      req.params.point_id,
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.coords,
      req.body.list_id
    );
    res.status(200).send(); // ***Send point data?
  });

  router.delete("/:point_id", authenticateUser, (req, res) => {
    dbHelpers.deletePoint(req.params.point_id); //***Update this function?
    res.status(200).send();
  });

  return router;
};
