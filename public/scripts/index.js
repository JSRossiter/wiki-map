function renderList (lists, faves) {
  $('.lists').append($('<ul>'));

  for (list of lists) {
    var $faveBtn = $('<a>').text('Fave').addClass('favorite').data('list-id', list.id);
    if (faves.find(function (fave) {
      return fave === list;
    })) {
      $faveBtn.addClass('liked');
    }
    $('.lists ul').prepend($('<li>')
      .append($('<a>')
        .attr('href', '/lists/' + list.id)
        .append($('<h2>').text(list.title)))
      .append($faveBtn);
    );
  }
}

function flashMessage (message) {
  var span = $("<span>").addClass("flash-message").text(message);
  $("form").append(span);
  span.slideDown(function() {
    setTimeout(function() {
      span.slideUp();
    }, 2000);
  });
}

function newList (event) {
  event.preventDefault();
  var $title = $("input[name='list']");
  if (!$title[0].value) {
    flashMessage("You didn't type anything!");
  } else {
    $.ajax({
      url: "/lists/new",
      method: "POST",
      data: $title.serialize(),
      success: function (data) {
        renderList([data]);
        $title[0].value = "";
      }
    });
  }
}

function favorite (event) {
  console.log($(event.target).data('list-id'));
  var check = $(event.target).hasClass('liked') ? '' : 1;
  $.ajax({
    url: '/profile/favorites/' + $(event.target).data('list-id'),
    method: 'POST',
    data: {favorite: check}
    success: function () {
      $(event.target).toggleClass('liked');
    }
  });
}

$(function() {
  var lists = [
    {title: "Best food in Vancouver", id: 1},
    {title: "Best cinemas", id: 2},
    {title: "Another one!", id: 3}
  ];
  renderList(lists);
  $('.favorite').click(favorite);

  $.ajax({
    url: '/lists',
    method: 'GET',
    success: renderList
  }).then(function () {
    $('.favorite').click(favorite);
  });
  $("input[value='Submit'").click(newList);
});
