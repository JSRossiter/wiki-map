const insertTables = require("./insert-tables");
const db = require("./db-connection");

// users: username
// lists: title, creator_id
// @params: coord: '40.204942, -123.117063'
// points: title, description, coordinates, list_id
// fav_lists: list_id, user_id
// contributions: point_id, user_id
// insertTables.insertUser("LeBron");
// insertTables.insertList("Esport", 3);
// insertTables.insertPoint("fourth insertion", "third insertion description", '123, -123', '123,-123', 3);
// insertTables.insertFavList(3, 3);
// knex.table('users').pluck('id').then(function(ids) { console.log(ids); });


const knex = db.connect();

// @Returns res[0].field_to_access
// const name = "LeBron";
// knex.select('id')
// .from('users')
// .where('username', '=', name)
// .limit(1)
// .then(function(res) {
//   console.log("ID", res[0].id);
//   return res;
// })
// .catch(function(error) {
//   console.error(error);
// });


// const name = "LeBron";
// knex.select('id')
// .from('users')
// .where('username', '=', name)
// .limit(1)
// .then(function(res) {
//   console.log("ID", res[0].id);
//   return res;
// })
// .catch(function(error) {
//   console.error(error);
// });

knex.select('lists.title', 'users.username')
.from('users')
.join('lists', 'users.id', '=', 'creator_id')
.then(res => {
  console.log(res);
  return res;
})
.catch(error => {
  console.error(error);
});

knex.destroy();
