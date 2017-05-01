'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');


// return error({error: 404, message: "error"});
module.exports = (knex) => {
  const dbQuery = require("../db/query-db")(knex);
  const dbInsert = require("../db/insert-tables")(knex);

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
    const listArray = [];
    listArray.push(id);

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
      let templateVars = { username: req.session.username, oldTitles: oldTitle, newTitles: newTitle, oldDescriptions: oldDescription, newDescriptions: newDescription, oldImages: oldImage, newImages: newImage, oldCoordinates: oldCoord, newCoordinates: newCoord, pointIds: pointId, updatedAts: updatedAt, listId: listArray };
      res.render('./edit-history', templateVars);
    })
    .catch(err => {
      console.error(err);
    });
  });

  router.post('/rollback/:point_id/:list_id', authenticateUser, (req, res) => {
    // Do query to revert points to old value
    const id = req.params.point_id;
    const listId = req.params.list_id;
    const oldTitle = [];
    const oldDescription = [];
    const oldCoord = [];
    const oldImage = [];

    dbQuery.getOldPointStats(id)
    .then(result => {
      for (let item in result) {
        if (result.hasOwnProperty(item)) {
          if (result[item].column_name === 'title') {
            oldTitle.push(result[item].old_value);
          } else if (result[item].column_name === 'description') {
            oldDescription.push(result[item].old_value);
          } else if (result[item].column_name === 'image') {
            oldImage.push(result[item].old_value);
          } else if (result[item].column_name === 'coordinates'){
            oldCoord.push(result[item].old_value);
          }
        }
      }
      console.log("list id, point id", listId, id);
      dbInsert.insertPoint(oldTitle[0], oldDescription[0], oldImage[0], oldCoord[0], listId).then(insRes => {
        console.log("Inserted old point into points successfully");
      });
      res.redirect(`/lists/${listId}`);
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
