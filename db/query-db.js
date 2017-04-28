const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());

module.exports = function(knex) {
  return {
    getLists: () => {
      console.log("Getting all lists");
      return knex.select('lists.title', 'lists.id')
      .from('lists');
    },
    getOneList: (listId) => {
      console.log("Getting one list with id ", listId);
      return knex.select('lists.title', 'lists.id')
      .from('lists')
      .where('lists.id', '=', listId);
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
      .whereNull('deleted_at')
      .where('list_id', '=', listId);
    },
    getFavoriteLists: (userId) => {
      console.log("Getting favorite lists for ", userId);
      return knex.select('lists.id', 'lists.title')
      .from('lists')
      .join('fav_lists', 'lists.id', '=', 'list_id')
      .where('lists.user_id', '=', userId);
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
