// users, points, lists, fav_lists, contributions

exports.seed = function(knex, Promise) {
  return knex('points').del()
  .then(() => {
    return knex('contributions').del();
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
    console.log("entering seed");
    return Promise.all([
      knex('users').insert({id: 1, username: 'Alice'})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('lists').insert({id: 1, title: 'Restaurant', creator_id: 1})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('points').insert({id: 1, title: 'miku', description: 'japanese cuisine', image: 'www.amazon.com', coordinates: '49.282464, -123.117063',
       list_id: 1})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('fav_lists').insert({id: 1, list_id: 1, user_id: 1})
    ]);
  })
  .then(function () {
    console.log("entering last seed");
    return Promise.all([
      knex('contributions').insert({id: 1, point_id: 1, user_id: 1})
    ]);

  })
  .catch(error => {
    console.log("error seeding", error);
  });
};
