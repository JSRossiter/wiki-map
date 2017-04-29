
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('lists', table => {
      table.boolean('private').defaultTo('false').notNullable();
    }),
    knex.schema.createTable('private_list_access', table => {
      table.increments('id');
      table.integer('list_id');
      table.foreign('list_id').references('lists.id').onDelete('CASCADE');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('lists', table => {
      table.dropColumn('private');
    }),
    knex.raw('drop table private_list_access cascade')
  ]);
};
