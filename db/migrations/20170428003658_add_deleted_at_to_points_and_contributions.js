
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points', table => {
      table.timestamp('deleted_at').defaultTo(null);
    }),
    knex.schema.table('contributions', table => {
      table.timestamp('deleted_at').defaultTo(null);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points', table => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('contributions', table => {
      table.dropColumn('deleted_at');
    })
  ]);
};
