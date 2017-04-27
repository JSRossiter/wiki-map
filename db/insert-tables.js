const db = require("./db-connection");
// const firstName = process.argv[2];


// Server decides which function to call
// module.exports = function()...
module.exports = {
  insertUser: (firstName) => {
    const knex = db.connect();
    console.log("Inserting into users...");
    return knex.insert({username: firstName})
    .into('users')
    .then((data) => {
      return knex.destroy();
    }).catch((error) => {
      console.error("error running query", error);
    });
  },
  insertList: (title) => {
    const knex = db.connect();
    console.log("Inserting into lists...");
    return knex.insert({title: title})
    .into('lists')
    .then((data) => {
      return knex.destroy();
    }).catch((error) => {
      console.error("error running query", error);
    });
  },
  // @params: coord: '40.204942, -123.117063'
  insertPoint: (title, description, image, coord, listId) => {
    const knex = db.connect();
    console.log("Inserting into points...");
    return knex.insert({title: title, description: description, image: image, coordinates: coord, list_id: listId})
    .into('points')
    .then((data) => {
      console.log("in destroy");
      return knex.destroy();
    }).catch((error) => {
      console.error("error running query", error);
    });
  },
  insertFavList: (listId, userId) => {
    const knex = db.connect();
    console.log("Inserting into fav_lists...");
    return knex.insert({list_id: listId, user_id: userId})
    .into('fav_lists')
    .then((data) => {
      return knex.destroy();
    }).catch((error) => {
      console.error("error running query", error);
    });
  }
}
