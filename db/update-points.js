const db = require("./db-connection");

module.exports = function(knex) {
  return {
    // @param: timestamp
    pointsRemovedAt: (pointsId) => {
      return knex('points')
      .where('points.id', '=', pointsId)
      .update({
        'deleted_at': knex.raw('current_timestamp')
      });
    },
    contributionsRemovedAt: (pointId, userId) => {
      console.log('Updating removed_at for contributions');
      return knex('contributions')
      .where('contributions.point_id', '=', pointId)
      .andWhere('contributions.user_id', '=', userId)
      .update({
        'deleted_at': knex.raw('current_timestamp')
      });
    },
    updatePoints: (pointId, title, description, imagePath, coord) => {
      console.log('Updating points');
      return knex('points')
      .where('points.id', '=', pointId)
      .update({
        'title': title,
        'description': description,
        'image': imagePath,
        'coordinates': coord
      });
    }
  };
};
