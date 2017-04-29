const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());
const knex = db.connect();
const queryMethods = require("./query-db")(knex);
const removePoints = require("./update-points")(knex);

const pointId = 1001;
const userId = 1001;

insertTables.insertContributions(pointId, userId)
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
});
