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
      table.foreign('creator_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('points', table => {
      table.increments('id');
      table.string('title');
      table.string('description');
      table.string('image');
      table.specificType('coordinates', 'POINT');
      table.integer('list_id');
      table.foreign('list_id').references('lists.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('fav_lists', table => {
      table.increments('id');
      table.integer('list_id');
      table.foreign('list_id').references('lists.id').onDelete('CASCADE');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('contributions', table => {
      table.increments('id');
      table.integer('point_id');
      table.foreign('point_id').references('points.id').onDelete('CASCADE');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table users cascade'),
    knex.raw('drop table lists cascade'),
    knex.raw('drop table points cascade'),
    knex.raw('drop table fav_lists cascade'),
    knex.raw('drop table contributions cascade')
  ]);
};
