exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('points_edit_history', table => {
      table.increments('id');
      table.string('column_name');
      table.string('old_value');
      table.string('new_value');
      table.integer('point_id');
      table.foreign('point_id').references('points.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table points_edit_history cascade')
  ]);
};
