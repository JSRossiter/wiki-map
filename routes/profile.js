'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');

module.exports = (knex) => {

  const dbRemove = require('../db/remove-favorite')(knex); //***Why move these inside exports object?
  const dbInsert = require('../db/insert-tables')(knex);
  const dbGet = require('../db/query-db')(knex);

  router.get('/', (req, res) => {
    let templateVars = { username: req.session.username };
    res.render('profile', templateVars);
  });

  router.get('/favorites', (req, res) => {
    console.log('getting favs ...');
    if (req.session.user_id) {
      dbGet.getFavoriteLists(req.session.user_id).then(data => {
        console.log('query results from getFavoriteLists function:\n', data); //***Delete after testing
        res.json(data);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      res.json([]);
    }
  });

  router.get('/contributions', authenticateUser, (req, res) => {
    dbGet.getContributions(req.session.user_id).then(data => {
      console.log('query results from getContributions function:\n', data); //***Delete after testing
      res.json(data);
    })
    .catch(error => {
      console.error(error);
    });
  });

  router.post('/favorites/:list_id', authenticateUser, (req, res) => {
    if (req.body.favorite) {
      dbInsert.insertFavList(req.params.list_id, req.session.user_id).then(() => {
        res.status(200).send();
      });
    } else {
      dbRemove.removeFavList(req.params.list_id, req.session.user_id).then(() => {
        res.status(200).send();
      });
    }
  });

  return router;
};
