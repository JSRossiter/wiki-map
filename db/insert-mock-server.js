const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());

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

insertTables.insertUser("Le").then(res => {
  console.log(res);
})
.catch(error => {
  console.error(error);
});
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

// knex.select('lists.title', 'users.username')
// .from('users')
// .join('lists', 'users.id', '=', 'creator_id')
// .then(res => {
//   console.log(res);
//   return res;
// })
// .catch(error => {
//   console.error(error);
// });

// GET /lists
// Return list of lists

// function cb(res) {
//   for (let title in res) {
//     if (res.hasOwnProperty(title)) {
//       console.log(res[title].title);
//     }
//   }
// }
//
// knex.select('lists.title')
// .from('lists')
// .then(res => {
//   cb(res);
//   return res;
// })
// .catch(error => {
//   console.error(error);
// });

// GET /lists/:list_id/points
// Return data - points for given list
// function cb(res) {
//   for (let field in res) {
//     if (res.hasOwnProperty(field)) {
//       console.log("title", res[field].title);
//       console.log("description", res[field].description);
//       console.log("image path", res[field].image);
//       console.log("coordinates", res[field].coordinates);
//       console.log("list_id", res[field].list_id);
//     }
//   }
// }
//
// knex.select('*')
// .from('points')
// .join('lists', 'points.list_id', '=', 'lists.id')
// .where('lists.id', '=', 2)
// .then(res => {
//   cb(res);
//   // console.log(res);
//   return res;
// })
// .catch(error => {
//   console.error(error);
// });

// GET /profile/favorites
// Return list's title if it is favorited by the user
// change userId or username to search for that user's favs
// const userId = 2;
// knex.select('lists.title')
// .from('users')
// .join('lists', 'users.id', '=', 'lists.creator_id')
// .join('fav_lists', 'lists.id', '=', 'fav_lists.list_id')
// .where('users.id', '=', userId)
// .then(res => {
//   cb(res);
//   console.log(res);
// })
// .catch(error => {
//   console.error(error);
// });

// GET /profile/contributions
// Return contributions
// SELECT username, users.id FROM users JOIN contributions ON users.id = user_id WHERE users.id = 1;
// knex.select('username', 'users.id')
// .from('users')
// .join('contributions', 'users.id', '=', 'contributions.user_id')
// .where('users.id', '=', 1)
// .then(res => {
//
//   console.log(res);
// })
// .catch(error => {
//   console.error(error);
// });


// DELETE /points/:point_id
// Remove point
