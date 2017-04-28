const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());
const knex = db.connect();
const queryMethods = require("./query-db")(knex);

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
//
// knex.select('lists.title')
// .from('users')
// .join('lists', 'users.id', '=', 'lists.user_id')
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
//   console.log(res);
// })
// .catch(error => {
//   console.error(error);
// });

// TODO
// DELETE /points/:point_id
// Remove point from one user -> need to delete from contributions first
// @param: point_id to be deleted
// Run two delete queries sequentially
// DELETE FROM contributions WHERE contributions.point_id = 1 & user_id = 1;
// const point_id = 2;
//
// knex('contributions')
// .where('point_id', '=', point_id)
// .del();
//
// knex('points')
// .where('points.id', '=', point_id)
// .del();

// queryMethods.getLists().then(res => {
//   for (let title in res) {
//     if (res.hasOwnProperty(title)) {
//       console.log(res[title].title);
//     }
//   }
// })
// .catch(error => {
//   console.error(error);
// });
//
// const listId = 1001;
// queryMethods.getPoints(listId).then(res => {
//   for (let field in res) {
//     if (res.hasOwnProperty(field)) {
//       console.log("title: ", res[field].title);
//       console.log("description: ", res[field].description);
//       console.log("image path: ", res[field].image);
//       console.log("coordinates: ", res[field].coordinates);
//       console.log("list_id: ", res[field].list_id);
//     }
//   }
// });

// const userId = 1001;
// queryMethods.getFavoriteLists(userId).then(res => {
//   for (let field in res) {
//     if (res.hasOwnProperty(field)) {
//       console.log("Fav list title: ", res[field].title);
//       console.log("fav_list_id ", res[field].id);
//     }
//   }
// })
// .catch(error => {
//   console.error(error);
// });

// queryMethods.getContributions(userId).then(res => {
//   for (let field in res) {
//     if (res.hasOwnProperty(field)) {
//       console.log(res[field].username);
//       console.log(res[field].id);
//     }
//   }
// });

// const title = "Band";
// // userId must have been created already
// const userId = 1000;
// insertTables.insertList(title, userId)
// .then(res => {
//   console.log("In promise resolve for insertList", res);
// })
// .catch(error => {
//   console.error(error);
// });

const username = "maxritcher";
queryMethods.getUserId(username)
.then(res => {
  console.log(res[0].id);
})
.catch(error => {
  console.error(error);
});
