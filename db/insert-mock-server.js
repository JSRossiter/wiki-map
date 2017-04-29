const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());
const knex = db.connect();
const queryMethods = require("./query-db")(knex);
const removePoints = require("./update-points")(knex);

let title = "hi";

queryMethods.getOnePoint(1001)
.then(res => {
  const title = res[0].title;
  const description = res[0].description;
  const img = res[0].image;
  const coord = res[0].coordinates;
  console.log("title description img coord", title, description, img, coord);
  console.log("\n length", res.length);
});
