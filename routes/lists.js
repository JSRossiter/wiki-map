'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const {authenticateUser} = require('./route-helpers')(knex);
  const dbInsert = require('../db/insert-tables')(knex);
  const dbGet = require('../db/query-db')(knex);

  router.get('/', (req, res, next) => {
    dbGet.getFavoriteCounts().then(data => {
      res.json(data);
    })
    .catch(error => {
      next({ status: 500, message: 'Database error' });
    });
  });

  router.post('/new', authenticateUser, (req, res, next) => {
    dbInsert.insertList(req.body.title, req.session.user_id, req.body.private).then(data => {
      if (req.body.private === "true") {
        return dbInsert.insertAccess(data[0], req.session.user_id);
      } else {
        return data;
      }
    }).then(data => {
      res.json({ id: data[0] });
    }).catch(error => {
      next({ status: 500, message: 'Database error' });
    });
  });

  router.get('/:list_id/access', (req, res, next) => {
    dbGet.getAccess(req.params.list_id).then(data => {
      res.json(data);
    }).catch(error => {
      error.status = 500;
      next({ status: 500, message: 'Database error' });
    });
  });

  router.get('/:list_id/points', (req, res, next) => {
    dbGet.getPoints(req.params.list_id).then(data => {
      res.json(data);
    }).catch(error => {
      next({ status: 500, message: 'Database error' });
    });
  });

  router.get('/:list_id', (req, res, next) => {
    dbGet.getOneList(req.params.list_id).then(data => {
      let templateVars = {
        username: req.session.username,
        list: data[0].title,
        list_id: req.params.list_id,
        private: data[0].private
      };
      res.render('map', templateVars);
    }).catch(error => {
      next({ status: 500, message: 'Database error' });
    });
  });

  return router;
};
