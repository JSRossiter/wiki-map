'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const {authenticateUser} = require('./route-helpers')(knex);
  const dbRemove = require('../db/remove-favorite')(knex); //***Why move these inside exports object?
  const dbInsert = require('../db/insert-tables')(knex);
  const dbGet = require('../db/query-db')(knex);

  router.get('/', authenticateUser, (req, res) => {
    let templateVars = { username: req.session.username };
    res.render('profile', templateVars);
  });

  router.get('/favorites', (req, res, next) => {
    console.log('getting favs ...');
    if (req.session.user_id) {
      dbGet.getFavoriteLists(req.session.user_id).then(data => {
        console.log('query results from getFavoriteLists function:\n', data); //***Delete after testing
        res.json(data);
      }).catch(error => {
        error.status = 500;
        next(error);
      });
    } else {
      res.json([]);
    }
  });

  router.get('/contributions', authenticateUser, (req, res, next) => {
    dbGet.getContributions(req.session.user_id).then(data => {
      console.log('query results from getContributions function:\n', data); //***Delete after testing
      res.json(data);
    }).catch(error => {
      error.status = 500;
      next(error);
    });
  });

  // TODO refactor query to accept username
  router.post('/private_lists/:list_id', authenticateUser, (req, res, next) => {
    console.log(req.body);
    dbGet.getUserId(req.body.access).then(data => {
      console.log(data[0]);
      return dbInsert.insertAccess(req.params.list_id, data[0].id);
    })
    .then(() => {
      res.status(200).send();
    }).catch(error => {
      error.status = 500;
      next(error);
    });
  });

  router.get('/private_lists', authenticateUser, (req, res, next) => {
    dbGet.getPrivateLists(req.session.user_id).then(data => {
      console.log('query results from getPrivateLists function:\n', data); //***Delete after testing
      res.json(data);
    }).catch(error => {
      error.status = 500;
      next(error);
    });
  });

  router.post('/favorites/:list_id', authenticateUser, (req, res, next) => {
    if (req.body.favorite) {
      dbInsert.insertFavList(req.params.list_id, req.session.user_id).then(() => {
        res.status(200).send();
      }).catch(error => {
        error.status = 500;
        next(error);
      });
    } else {
      dbRemove.removeFavList(req.params.list_id, req.session.user_id).then(() => {
        res.status(200).send();
      }).catch(error => {
        error.status = 500;
        next(error);
      });
    }
  });
  return router;
};
