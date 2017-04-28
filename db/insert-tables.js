const db = require("./db-connection");
// const firstName = process.argv[2];


// Server decides which function to call
// module.exports = function()...
module.exports = function(knex) {
  return {
    //***
    // return id after insert - https://github.com/tgriesser/knex/issues/732
    // http://knexjs.org/#Builder-returning

    insertUser: (firstName) => {
      console.log("Inserting into users...");
      return knex.insert({username: firstName}).into('users');
    },
    insertList: (title) => {
      console.log("Inserting into lists...");
      return knex.insert({title: title}).into('lists');
    },
    // @params: coord: '40.204942, -123.117063'
    insertPoint: (title, description, image, coord, listId) => {
      console.log("Inserting into points...");
      return knex.insert({title: title, description: description, image: image, coordinates: coord, list_id: listId})
      .into('points');
    },
    insertFavList: (listId, userId) => {
      console.log("Inserting into fav_lists...");
      return knex.insert({list_id: listId, user_id: userId})
      .into('fav_lists');
    },
    insertContributions: (pointId, userId) => {
      console.log("Inserting into contributions...");
      return knex.insert({point_id: pointId, user_id: userId})
      .into('contributions');
    }
  };
};
