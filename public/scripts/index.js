function renderList (lists, faves) {
  for (list of lists) {
    var $row = $('<tr>')
    var $title = $('<td>')
      .append($('<a>')
      .attr('href', '/lists/' + list.id)
      .addClass('list-title')
      .text(list.title));
    var $faveCount = $('<td>').addClass('counter').text(list.count);
    $row.append($title, $faveCount);
    if($('.logged-in').length) {
      var $faveBtn = $('<a>').text('Fave').addClass('favorite').data('list-id', list.id);
      if (faves && faves.find(function (fave) {
        return fave.id === list.id;
      })) {
        $faveBtn.addClass('liked');
      }
      var $faveBtnCell = $('<td>').append($faveBtn);
      $row.append($faveBtnCell);
    }
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
      data: $(event.target).closest('form').serialize(),
      success: function (data) {
        window.location.replace("/lists/" + data.id);
      },
      error: function (error) {
        flashMessage(JSON.parse(error.responseText).message);
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
      $(event.target).toggleClass('liked');
      var $counter = $(event.target).closest('tr').find('.counter');
      if (check) {
        $counter.text(parseInt($counter.text(), 10) + 1);
      } else {
        $counter.text(parseInt($counter.text(), 10) - 1);
      }
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
