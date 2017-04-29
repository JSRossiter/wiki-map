
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points_edit_history', table => {
      table.timestamp('updated_at').defaultTo(null);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points_edit_history', table => {
      table.dropColumn('updated_at');
    })
  ]);
};
