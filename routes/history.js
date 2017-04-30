'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');


// return error({error: 404, message: "error"});
module.exports = (knex) => {
  const dbQuery = require("../db/query-db")(knex);

  router.get('/:list_id', authenticateUser, (req, res) => {
    const id = req.params.list_id;
    const pointId = [];
    const oldTitle = [];
    const newTitle = [];
    const oldDescription = [];
    const newDescription = [];
    const oldImage = [];
    const newImage = [];
    const oldCoord = [];
    const newCoord = [];
    const updatedAt = [];

    dbQuery.getEditHistoryForList(id)
    .then(result => {
      for (let item in result) {
        if (result.hasOwnProperty(item)) {
          pointId.push(result[item].point_id);
          updatedAt.push(JSON.stringify(result[item].updated_at).substring(0, 7));

          if (result[item].column_name === 'title') {
            oldTitle.push(result[item].old_value);
            newTitle.push(result[item].new_value);
          } else if (result[item].column_name === 'description') {
            oldDescription.push(result[item].old_value);
            newDescription.push(result[item].new_value);
          } else if (result[item].column_name === 'image') {
            oldImage.push(result[item].old_value);
            newImage.push(result[item].new_value);
          } else {
            oldCoord.push(result[item].old_value);
            newCoord.push(result[item].new_value);
          }
        }
      }
      let templateVars = { username: req.session.username, oldTitles: oldTitle, newTitles: newTitle, oldDescriptions: oldDescription, newDescriptions: newDescription, oldImages: oldImage, newImages: newImage, oldCoordinates: oldCoord, newCoordinates: newCoord, pointIds: pointId, updatedAts: updatedAt };
      res.render('./edit-history', templateVars);
    })
    .catch(err => {
      console.error(err);
    });
  });

  router.post('/rollback/:point_id/:updatedAt', authenticateUser, (req, res) => {
    // Do query to revert points to old value
    const id = req.params.point_id;
    const oldTitle = [];
    const oldDescription = [];
    const oldCoord = [];
    const oldImage = [];
    dbQuery.getOnePoint(id)
    .then(result => {
      for (let item in result) {
        if (result.hasOwnProperty(item)) {
          if (result[item].column_name === 'title') {
            oldTitle.push(result[item].old_value);
          } else if (result[item].column_name === 'description') {
            oldDescription.push(result[item].old_value);
          } else if (result[item].column_name === 'image') {
            oldImage.push(result[item].old_value);
          } else {
            oldCoord.push(result[item].old_value);
          }
        }
      }
      dbQuery.getListFromPointId(id)
      .then(resultGet => {
        for (let i = 0; i < oldTitle.length; i++) {
          dbInsert.insertPoint(oldTitle[i], oldDescription[i], oldImage[i], oldCoord[i], resultGet[0].list_id);
        }
        res.redirect(`/lists/${resultGet[0].list_id}`);
      });
    })
    .catch(err => {
      console.error(err);
    });

  });

  router.get('/', authenticateUser, (req, res) => {
    let templateVars = { username: req.session.username };
    res.render('./edit-history', templateVars);
  });


  return router;
};
