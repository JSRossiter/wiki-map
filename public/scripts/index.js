function renderList (lists, faves) {
  for (list of lists) {
    var $faveBtn = $('<a>').text('Fave').addClass('favorite').data('list-id', list.id);
    if (faves && faves.find(function (fave) {
      console.log(fave);
      console.log(list);
      return fave == list;
    })) {
      $faveBtn.addClass('liked');
    }
    var $row = $('<tr>')
    var $title = $('<td>')
      .append($('<a>')
      .attr('href', '/lists/' + list.id)
      .addClass('list-title')
      .text(list.title));
    var $faveBtnCell = $('<td>').append($faveBtn);
    var $faveCount = $('<td>') // set text to list.faveCount
    $row.append($title, $faveBtnCell, $faveCount);
    $('.lists table').append($row);
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
        window.location.replace("/lists/" + data.id);
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
