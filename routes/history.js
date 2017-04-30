'use strict';

const express = require('express');
const router  = express.Router();
const authenticateUser = require('./route-helpers');


// return error({error: 404, message: "error"});
module.exports = (knex) => {
  const dbQuery = require("../db/query-db")(knex);

  router.get('/:list_id', authenticateUser, (req, res) => {
    const id = req.params.list_id;
    const oldTitle = [];
    const newTitle = [];
    const oldDescription = [];
    const newDescription = [];
    const oldImage = [];
    const newImage = [];
    const oldCoord = [];
    const newCoord = [];

    dbQuery.getEditHistoryForList(id)
    .then(result => {
      for (let item in result) {
        console.log(result[item]);
        if (result.hasOwnProperty(item)) {
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
      let templateVars = { username: req.session.username, oldTitles: oldTitle, newTitles: newTitle, oldDescriptions: oldDescription, newDescriptions: newDescription, oldImages: oldImage, newImages: newImage, oldCoordinates: oldCoord, newCoordinates: newCoord };
      res.render('./edit-history', templateVars);
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
