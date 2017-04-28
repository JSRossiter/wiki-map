function renderList (lists, faves) {
  for (list of lists) {
    var $faveBtn = $('<a>').text('Fave').addClass('favorite').data('list-id', list.id);
    if (typeof faves !== "string" && faves.find(function (fave) {
      return fave === list;
    })) {
      $faveBtn.addClass('liked');
    }
    $('.lists ul').prepend($('<li>')
      .append($('<a>')
        .attr('href', '/lists/' + list.id)
        .append($('<h2>').text(list.title)))
      .append($faveBtn)
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
  var $title = $("input[name='title']");
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
  var check = $(event.target).hasClass('liked') ? '' : 1;
  event.preventDefault();
  $.ajax({
    url: '/profile/favorites/' + $(event.target).data('list-id'),
    method: 'POST',
    data: {favorite: check},
    success: function () {
      console.log('success!');
      $(event.target).toggleClass('liked');
    }
  });
}

$(function() {
  $.ajax({
    url: '/lists',
    method: 'GET',
  }).then(function (lists) {
    $.ajax({
      url: '/profile/favorites',
      method: 'GET'
    }).then(function (faves) {
      renderList(lists, faves);
      $('.favorite').click(favorite);
    });
  });
  $("input[value='Submit'").click(newList);
});
