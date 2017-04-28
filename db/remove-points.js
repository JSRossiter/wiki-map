const db = require("./db-connection");
const insertTables = require("./insert-tables")(db.connect());

module.exports = function(knex) {
  return {
    // @param: timestamp
    pointsRemovedAt: (pointsId, dateNow) => {
      knex('points')
      .where('points.id', '=', pointsId)
      .update({
        removed_at: dateNow
      });
    },
    contributionsRemovedAt: (contId, dateNow) => {
      knex('contributions')
      .where('contributions.id', '=', contId)
      .update({
        removed_at: dateNow
      });
    }
  };
};
