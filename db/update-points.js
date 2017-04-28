const db = require("./db-connection");
// const insertTables = require("./insert-tables")(db.connect());

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
    contributionsRemovedAt: (pointId, userId, dateNow) => {
      console.log('Updating removed_at for contributions');
      knex('contributions')
      .where('contributions.point_id', '=', pointId)
      .andWhere('contributions.user_id', '=', userId)
      .update({
        removed_at: dateNow
      });
    }
  };
};
