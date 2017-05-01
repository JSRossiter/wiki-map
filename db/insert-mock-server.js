const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());
const knex = db.connect();
const queryMethods = require("./query-db")(knex);
const removePoints = require("./update-points")(knex);

// queryMethods.getEditHistoryForList(1001)
// .then(result => {
//   for (let i in result) {
//     console.log(result[i].updated_at);
//     console.log(typeof result[i].updated_at);
//     console.log(JSON.stringify(result[i].updated_at));
//     console.log(typeof JSON.stringify(result[i].updated_at));
//   }
// });

// queryMethods.getOldPointStats(1002)
// .then(res => {
//   for (let i in res) {
//     console.log(res[i]);
//   }
// });
