const db = require("./db-connection");

module.exports = function(knex) {
  return {
    removeFavList: (listId, userId) => {
      console.log("Removing from fav_lists...");
      return knex('fav_lists')
        .where({list_id: listId, user_id: userId})
        .del();
    }
  };
};
