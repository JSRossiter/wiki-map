const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());

module.exports = function(knex) {
  return {
    getLists: () => {
      console.log("Getting all lists");
      return knex.select('lists.title', 'lists.id')
      .from('lists');
    },
    getUserId: (username) => {
      console.log("Getting user_id");
      return knex.select('users.id')
      .from('users')
      .where('username', '=', username);
    },
    getPoints: (listId) => {
      console.log("Getting points for", listId);
      return knex.select('*')
      .from('points')
      .where('list_id', '=', listId);
    },
    getFavoriteLists: (userId) => {
      console.log("Getting favorite lists for", userId);
      return knex.select('lists.id', 'lists.title')
      .from('users')
      .join('lists', 'users.id', '=', 'lists.user_id')
      .join('fav_lists', 'lists.id', '=', 'fav_lists.list_id')
      .where('users.id', '=', userId);
    },
    getContributions: (userId) => {
      console.log("Getting contributions for", userId);
      return knex.select('username', 'users.id')
      .from('users')
      .join('contributions', 'users.id', '=', 'contributions.user_id')
      .where('users.id', '=', userId);
    }
  };
};
