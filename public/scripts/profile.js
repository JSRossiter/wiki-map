function renderList (lists, $container) {
  for (list of lists) {
    $container
      .append($('<a>').attr('href', '/lists/' + list.id)
      .append($('<h2>').text(list.title)));
  }
}

$(function() {
  $.ajax({
    url: '/profile/favorites',
    method: 'GET',
    success: function (data) {
      if (data.length) {
        renderList(data, $('.favorites'));
      } else {
        $('.favorites').append($('<p>').text('Go checkout some of the lists our users have made'));
      }
    }
  });
  $.ajax({
    url: '/profile/contributions',
    method: 'GET',
    success: function (data) {
      if (data.length) {
        renderList(data, $('.contributions'));
      } else {
        $('.contributions').append($('<p>').text('Go add some points!'));
      }
    }
  });
  $.ajax({
    url: '/profile/private_lists',
    method: 'GET',
    success: function (data) {
      if (data.length) {
        $('.private').append($('<h2>').text('My Private Lists'));
        renderList(data, $('.private'));
      }
    }
  });
});
