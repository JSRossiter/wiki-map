
exports.up = function(knex, Promise) {
  return knex.schema.table('lists', table => {
    table.renameColumn('creator_id', 'user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('lists', table => {
    table.renameColumn('user_id', 'creator_id');
  });
};
