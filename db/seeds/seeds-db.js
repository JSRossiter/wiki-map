// users, points, lists, fav_lists, contributions

// hi
exports.seed = function(knex, Promise) {
  return knex('contributions').del()
  .then(() => {
    return knex('points').del();
  })
  .then(() => {
    return knex('fav_lists').del();
  })
  .then(() => {
    return knex('lists').del();
  })
  .then(() => {
    return knex('users').del();
  })
  .then(function () {
    return Promise.all([
      knex('users').insert({id: 1, username: 'maxritcher'}),
      knex('users').insert({id: 2, username: 'mayingjeou'})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('lists').insert({id: 1, title: 'Restaurant', creator_id: 1}),
      knex('lists').insert({id: 2, title: 'Sports', creator_id: 2}),
      knex('lists').insert({id: 3, title: 'Music', creator_id: 2}),
      knex('lists').insert({id: 4, title: 'School', creator_id: 2})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('points').insert({id: 1, title: 'miku', description: 'japanese cuisine', image: 'www.amazon.com', coordinates: '49.282464, -123.117063',
      list_id: 1}),
      knex('points').insert({id: 2, title: 'AAA', description: 'Heat', image: 'www.heat.com', coordinates: '40.204942, -123.117063',
      list_id: 2}),
      knex('points').insert({id: 3, title: 'La La Land', description: 'Someone in the crowd', image: 'www.lala.com', coordinates: '40.204942, -123.117063',
      list_id: 2})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('fav_lists').insert({id: 1, list_id: 1, user_id: 1}),
      knex('fav_lists').insert({id: 2, list_id: 2, user_id: 2})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('contributions').insert({id: 1, point_id: 1, user_id: 1}),
      knex('contributions').insert({id: 2, point_id: 2, user_id: 2})
    ]);

  })
  .catch(error => {
    console.log("error seeding", error);
  });
};
