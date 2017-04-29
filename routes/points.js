'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');

module.exports = (knex) => {

  const dbInsert = require('../db/insert-tables')(knex);
  const dbUpdate = require('../db/update-points')(knex);

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

  router.put('/edit/:point_id', authenticateUser, (req, res) => {
    dbUpdate.updatePoints(
      req.params.point_id,
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.coordinates
    ).then(() => {
      return dbInsert.insertContributions(req.params.point_id, req.session.user_id);
    }).then(() => {
      let point = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
      };
      res.json(point);
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
