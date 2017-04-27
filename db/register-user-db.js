const db = require("./db-connection");
const firstName = process.argv[2];

// module.exports = function()...
function insertQuery() {
  const knex = db.connect();
  console.log("Inserting ...");

  return knex.insert({username: firstName})
  .into('users')
  .then((data) => {
    return knex.destroy();
  }).catch((error) => {
    console.error("error running query", error);
  });
}

insertQuery();
