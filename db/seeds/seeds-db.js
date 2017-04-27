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
      knex('users').insert({username: 'maxritcher'}),
      knex('users').insert({username: 'mayingjeou'})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('lists').insert({id: 1001, title: 'Restaurant', creator_id: 1}),
      knex('lists').insert({id: 1002, title: 'Sports', creator_id: 2}),
      knex('lists').insert({id: 1003, title: 'Music', creator_id: 2}),
      knex('lists').insert({id: 1004, title: 'School', creator_id: 2})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('points').insert({
        title: 'miku',
        description: 'japanese cuisine',
        image: 'http://foodology.ca/wp-content/uploads/2012/10/miku-aburi.jpg',
        coordinates: '49.2870468,-123.1128433',
        list_id: 1001
      }),
      knex('points').insert({
        title: "tacofino",
        description: "some pretty decent tacos",
        image: "https://pbs.twimg.com/profile_images/697941981704552448/Y-zl5UYk.jpg",
        coordinates: "49.2827202,-123.1048181",
        list_id: 1001
      }),
      knex('points').insert({
        title: "annalena",
        description: "they have chocolate chicken skin, what else is there to say",
        image: "http://static1.squarespace.com/static/5480d9cbe4b0e3ea019971a8/t/54a8ffdfe4b0243cdd54e363/1492718212399/?format=1500w",
        coordinates: "49.2708219,-123.1467779",
        list_id: 1001
      }),
      knex('points').insert({
        title: 'AAA',
        description: 'Heat',
        coordinates: '40.204942,-123.117063',
        list_id: 1002
      }),
      knex('points').insert({
        title: 'Via Tevere',
        description: 'Best pizza in Vancouver.',
        image: 'https://b.zmtcdn.com/data/pictures/5/16625835/15b9d03aed339b351c23fa8ffafd6e9b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        coordinates: '49.2648736,-123.086894',
        list_id: 1001
      }),
      knex('points').insert({
        title: 'La La Land',
        description: 'Someone in the crowd',
        coordinates: '40.204942,-123.117083',
        list_id: 1002
      })
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('fav_lists').insert({list_id: 1, user_id: 1}),
      knex('fav_lists').insert({list_id: 3, user_id: 1})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('contributions').insert({point_id: 1, user_id: 1}),
      knex('contributions').insert({point_id: 2, user_id: 2})
    ]);

  })
  .catch(error => {
    console.log("error seeding", error);
  });
};
