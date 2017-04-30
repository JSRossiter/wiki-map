// users, points, lists, fav_lists, contributions

// hi
exports.seed = function(knex, Promise) {
  return knex('contributions').del()
  .then(() => {
    return knex('points_edit_history').del();
  })
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
  .then(() => {
    return knex('private_list_access').del();
  })
  .then(function () {
    return Promise.all([
      knex('users').insert({id: 1000, username: 'maxritcher'}),
      knex('users').insert({id: 1001, username: 'mayingjeou'}),
      knex('users').insert({id: 1002, username: 'ludovico'}),
      knex('users').insert({id: 1006, username: 'jack'}),
      knex('users').insert({id: 1007, username: 'george'}),
      knex('users').insert({id: 1008, username: 'amber'}),
      knex('users').insert({id: 1009, username: 'alvin'}),
      knex('users').insert({id: 1005, username: 'brit'}),
      knex('users').insert({id: 1004, username: 'person'})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('lists').insert({id: 1001, title: 'Restaurant', user_id: 1000}),
      knex('lists').insert({id: 1002, title: 'Sports', user_id: 1001}),
      knex('lists').insert({id: 1003, title: 'Music', user_id: 1001}),
      knex('lists').insert({id: 1004, title: 'School', user_id: 1001}),
      knex('lists').insert({id: 1005, title: 'Private1', user_id: 1006, private: 'true'}),
      knex('lists').insert({id: 1006, title: 'Private2', user_id: 1006, private: 'true'})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('points').insert({
        id: 1000,
        title: 'miku',
        description: 'japanese cuisine',
        image: 'http://foodology.ca/wp-content/uploads/2012/10/miku-aburi.jpg',
        coordinates: '49.2870468,-123.1128433',
        list_id: 1001
      }),
      knex('points').insert({
        id: 1001,
        title: "tacofino",
        description: "some pretty decent tacos",
        image: "https://pbs.twimg.com/profile_images/697941981704552448/Y-zl5UYk.jpg",
        coordinates: "49.2827202,-123.1048181",
        list_id: 1001
      }),
      knex('points').insert({
        id: 1002,
        title: "annalena",
        description: "they have chocolate chicken skin, what else is there to say",
        image: "http://static1.squarespace.com/static/5480d9cbe4b0e3ea019971a8/t/54a8ffdfe4b0243cdd54e363/1492718212399/?format=1500w",
        coordinates: "49.2708219,-123.1467779",
        list_id: 1001
      }),
      knex('points').insert({
        id: 1003,
        title: 'AAA',
        description: 'Heat',
        coordinates: '40.204942,-123.117063',
        list_id: 1002
      }),
      knex('points').insert({
        id: 1004,
        title: 'Via Tevere',
        description: 'Best pizza in Vancouver.',
        image: 'https://b.zmtcdn.com/data/pictures/5/16625835/15b9d03aed339b351c23fa8ffafd6e9b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        coordinates: '49.2648736,-123.086894',
        list_id: 1001
      }),
      knex('points').insert({
        id: 1005,
        title: 'La La Land',
        description: 'Someone in the crowd',
        coordinates: '40.204942,-123.117083',
        list_id: 1002
      })
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('fav_lists').insert({id: 1000, list_id: 1001, user_id: 1000}),
      knex('fav_lists').insert({id: 1001, list_id: 1001, user_id: 1009}),
      knex('fav_lists').insert({id: 1002, list_id: 1001, user_id: 1008}),
      knex('fav_lists').insert({id: 1003, list_id: 1001, user_id: 1007}),
      knex('fav_lists').insert({id: 1004, list_id: 1002, user_id: 1000}),
      knex('fav_lists').insert({id: 1005, list_id: 1002, user_id: 1001}),
      knex('fav_lists').insert({id: 1006, list_id: 1003, user_id: 1001}),
      knex('fav_lists').insert({id: 1007, list_id: 1003, user_id: 1002}),
      knex('fav_lists').insert({id: 1008, list_id: 1003, user_id: 1006}),
      knex('fav_lists').insert({id: 1009, list_id: 1003, user_id: 1004}),
      knex('fav_lists').insert({id: 1010, list_id: 1003, user_id: 1005})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('private_list_access').insert({id: 1000, list_id: 1005, user_id: 1006}),
      knex('private_list_access').insert({id: 1002, list_id: 1006, user_id: 1006}),
      knex('private_list_access').insert({id: 1003, list_id: 1005, user_id: 1001})
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('contributions').insert({point_id: 1000, user_id: 1000}),
      knex('contributions').insert({point_id: 1001, user_id: 1001})
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('points_edit_history').insert({id: 1000, point_id: 1000, column_name: 'title', old_value: 'AAA', new_value: '1st', updated_at: '2017-1-1'}),
      knex('points_edit_history').insert({id: 1001, point_id: 1001, column_name: 'description', old_value: 'tocofino ', new_value: 'seed description', updated_at: '2017-1-2'}),
      knex('points_edit_history').insert({id: 1002, point_id: 1001, column_name: 'image', old_value: 'old image', new_value: 'new image', updated_at: '2017-1-3'}),
      knex('points_edit_history').insert({id: 1003, point_id: 1001, column_name: 'coordinates', old_value: '3rd', new_value: '4th', updated_at: '2017-1-4'})
    ]);
  })
  .catch(error => {
    console.log("error seeding", error);
  });
};
