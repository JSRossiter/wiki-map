"use strict";

const express = require('express');
const router  = express.Router();
const pointsHelper = require("../db/insert-tables"); //***Update const/file names?

module.exports = (knex) => {

  router.post("/new/:list_id", (req, res) => {
    // (auth users only) create new point, add to database
    // *** validate body data before passing to function
    let title = req.body.title;
    let description = req.body.description;
    let image = req.body.image_url;
    let coordinates = req.body.coordinates;
    let list_id = req.params.list_id;
    pointsHelper.insertPoint(title, description, image, coordinates, list_id);
    res.status(200).send(); // ***Send point data?
  });

  router.put("/edit/:point_id", (req, res) => {
    // (auth users only) edit point, update database
    // *** validate body data before passing to function
    let point_id = req.params.point_id;
    // let pointData = ? ;
    pointsHelper.editPoint(point_id, pointData); //***Update this function?
    res.status(200).send(); // ***Send point data?
  });

  router.delete("/:point_id", (req, res) => {
    // (auth users only) remove point from list
    pointsHelper.deletePoint(req.params.point_id); //***Update this function?
    res.status(200).send();
  });

  return router;
};
