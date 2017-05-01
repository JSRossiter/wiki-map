'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');

module.exports = (knex) => {
  const dbInsert = require("../db/insert-tables")(knex);
  const dbUpdate = require("../db/update-points")(knex);
  const dbQuery = require("../db/query-db")(knex);

  router.post('/new', authenticateUser, (req, res) => {
    console.log('POST "points/new"', req.body);
    dbInsert.insertPoint(
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.coordinates,
      req.body.list_id
    ).then((data) => {
      return dbInsert.insertContributions(data[0], req.session.user_id);
    }).then(() => {
      let point = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
      };
      res.json(point);
    });
  });

  router.put("/edit/:point_id", authenticateUser, (req, res) => {
    const info = {
      pointId: req.params.point_id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      coordinates: req.body.coordinates
    };

    dbQuery.getOnePoint(info.pointId)
    .then(result => {
      console.log(result);
      // Will refactor if time permits
      console.log('in /edit/:point_id, inserting into point_edit_history...');

      dbInsert.insertPointsEditHistory(info.pointId, 'title', result[0].title,
      info.title)
      .then(console.log("Successfully inserted title into points_edit_history"));

      dbInsert.insertPointsEditHistory(info.pointId, 'description', result[0].description, info.description)
      .then(console.log("Successfully inserted description into points_edit_history"));

      dbInsert.insertPointsEditHistory(info.pointId, 'image', result[0].image,
      info.image)
      .then(console.log("Successfully inserted image into points_edit_history"));

      dbInsert.insertPointsEditHistory(info.pointId, 'coordinates', JSON.stringify(result[0].coordinates),
      info.coordinates)
      .then(console.log("Successfully inserted coordinates into points_edit_history"));

      // update current point
      dbUpdate.updatePoints(
        info.pointId,
        info.title,
        info.description,
        info.image,
        info.coordinates
      ).then(() => {
        let point = {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image
        };
        res.json(point);
      });
    })
    .catch(err => {
      console.error(error);
    });

  });

  router.delete('/:point_id', authenticateUser, (req, res) => {
    dbInsert.insertContributions(req.params.point_id, req.session.user_id)
    .then(() => {
      return dbUpdate.pointsRemovedAt(req.params.point_id);
    })
    .then(() => {
      res.status(200).send();
    });
  });

  return router;
};
