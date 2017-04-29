const db = require("./db-connection");
// const firstName = process.argv[2];


// Server decides which function to call
// module.exports = function()...
module.exports = function(knex) {
  return {
    insertUser: (firstName) => {
      console.log("Inserting into users...");
      return knex.returning('id')
      .insert({username: firstName}).into('users');
    },
    insertList: (title, userId, private) => {
      console.log("Inserting into lists...");
      return knex.returning('id')
      .insert({title: title, user_id: userId, private: private}).into('lists');
    },
    // @params: coord: '40.204942, -123.117063'
    insertPoint: (title, description, image, coord, listId) => {
      console.log("Inserting into points...");
      return knex.returning('id')
      .insert({title: title, description: description, image: image, coordinates: coord, list_id: listId})
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
    },
    insertAccess: (listId, userId) => {
      console.log("Inserting into private_list_access...");
      return knex.insert({list_id: listId, user_id: userId}, "list_id")
      .into('private_list_access');
    }
  };
};
