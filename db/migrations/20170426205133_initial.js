exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('username');
    }),
    knex.schema.createTable('lists', table => {
      table.increments('id');
      table.string('title');
      table.integer('creator_id');
      table.foreign('creator_id').references('users.id');
    }),
    knex.schema.createTable('points', table => {
      table.increments('id');
      table.string('title');
      table.string('description');
      table.string('image');
      table.specificType('coordinates', 'POINT');
      table.integer('list_id');
      table.foreign('list_id').references('lists.id');
    }),
    knex.schema.createTable('fav_lists', table => {
      table.increments('id');
      table.integer('list_id');
      table.foreign('list_id').references('lists.id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.createTable('contributions', table => {
      table.increments('id');
      table.integer('point_id');
      table.foreign('point_id').references('points.id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones'),
    knex.schema.dropTable('lists'),
    knex.schema.dropTable('points'),
    knex.schema.dropTable('fav_lists'),
    knex.schema.dropTable('contributions')
  ]);
};
