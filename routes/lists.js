'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');

module.exports = (knex) => {

  const dbInsert = require('../db/insert-tables')(knex);
  const dbGet = require('../db/query-db')(knex);

  router.get('/', (req, res) => {
    dbGet.getLists().then(data => {
      console.log('query results from getLists function:\n', data); //***Delete after testing
      res.json(data);
    })
    .catch(error => {
      console.error(error);
    });
  });

  router.post('/new', authenticateUser, (req, res) => {
    console.log(req.body);
    dbInsert.insertList(req.body.title, req.session.user_id).then(data => {
      res.json({ id: data[0] });
    });
  });

  router.get('/:list_id', (req, res) => {
    dbGet.getOneList(req.params.list_id).then(data => {
      let templateVars = {
        username: req.session.username,
        list: data[0].title,
        list_id: req.params.list_id
      };
      res.render('map', templateVars);
    });
  });

  router.get('/:list_id/points', (req, res) => {
    dbGet.getPoints(req.params.list_id).then(data => {
      res.json(data);
    });

  });

  return router;
};
