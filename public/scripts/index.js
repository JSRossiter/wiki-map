// function renderList (lists, faves) {
//   for (list of lists) {
//     var $row = $('<tr>')
//     var $title = $('<td>')
//       .append($('<a>')
//       .attr('href', '/lists/' + list.id)
//       .addClass('list-title')
//       .text(list.title));
//     var $faveCount = $('<td>').addClass('counter').text(list.count);
//     $row.append($title, $faveCount);
//     if($('.logged-in').length) {
//       var $faveBtn = $('<a>').text('Fave').addClass('favorite').data('list-id', list.id);
//       if (faves && faves.find(function (fave) {
//         return fave.id === list.id;
//       })) {
//         $faveBtn.addClass('liked');
//       }
//       var $faveBtnCell = $('<td>').append($faveBtn);
//       $row.append($faveBtnCell);
//     }
//     $('.lists table').append($row);
//   }
// }


/*  After getting lists and favorites from db, format list display card.
    Logged in users can use the 'favorite lists' feature (like/unlike a list).*/
function createListCard (lists, faves) {
  for (list of lists) {
    var $listCard = $('<div class="col-md-4 col-sm-6 portfolio-item"><a href="#portfolioModal1" class="portfolio-link" data-toggle="modal"><div class="portfolio-hover"><div class="portfolio-hover-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="img/portfolio/roundicons.png" class="img-responsive" alt=""></a>');
    var $title = $('<div class="portfolio-caption">')
      .append($('<a>')
      .attr('href', '/lists/' + list.id)
      .addClass('list-title')
      .text(list.title));
    var $faveCount = $('<p class="text-muted">').addClass('counter').text('Likes ' + list.count);
    $listCard.append($title);
    $title.append($faveCount);
    if($('.logged-in').length) {
      var $faveBtn = $('<span class="fa fa-star fa-3x"').addClass('favorite').data('list-id', list.id);
      if (faves && faves.find(function (fave) {
        return fave.id === list.id;
      })) {
        $faveBtn.addClass('liked');
      }
      var $faveBtnCell = $('<div>').append($faveBtn);
      $title.append($faveBtnCell);
    }
    $('#lists').append($listCard);
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
    method: 'GET'
  }).then(function (lists) {
    $.ajax({
      url: '/profile/favorites',
      method: 'GET'
    }).then(function (faves) {
      createListCard(lists, faves);
      $('.favorite').click(favorite);
    });
  });
  $("input[value='Submit'").click(newList);
});
