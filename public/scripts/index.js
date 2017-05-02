// function createListCard (lists, faves) {
//   for (list of lists) {
//     var $listCard = $('<div class="col-md-4 col-sm-6 portfolio-item"><a href="#portfolioModal1" class="portfolio-link" data-toggle="modal"><div class="portfolio-hover"><div class="portfolio-hover-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="img/portfolio/roundicons.png" class="img-responsive" alt=""></a>');
//     var $title = $('<div class="portfolio-caption">')
//       .append($('<a>')
//       .attr('href', '/lists/' + list.id)
//       .addClass('list-title')
//       .text(list.title));
//     var $faveCount = $('<p class="large text-muted">').addClass('counter').text(list.count);
//     $listCard.append($title);
//     $title.append($faveCount);
//     if($('.logged-in').length) {
//       var $faveBtn = $('<span class="fa fa-star fa-3x">').addClass('favorite').data('list-id', list.id);
//       if (faves && faves.find(function (fave) {
//         return fave.id === list.id;
//       })) {
//         $faveBtn.addClass('liked');
//       }
//       var $faveBtnCell = $('<div>').append($faveBtn);
//       $title.append($faveBtnCell);
//     }
//     $('#lists').append($listCard);
//   }
// }



/*  After getting lists and favorites from db, format list display card.
    Logged in users can use the 'favorite lists' feature (like/unlike a list).*/
function createListCard (lists, faves) {
  for (list of lists) {
    var $listCard = $('<div class="col-md-4 col-sm-6 portfolio-item">')
      .append($('<a>')
      .attr('href', '/lists/' + list.id)
      .addClass('portfolio-link')
      .html('<div class="portfolio-hover"><div class="portfolio-hover-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="img/portfolio/roundicons.png" class="img-responsive" alt=""></a>'));
    var $title = $('<div class="portfolio-caption">')
      .append($('<div>')
      .addClass('list-title')
      .text(list.title));
    var $faveCount = $('<div>').addClass('counter').text(list.count);
    $listCard.append($title);
    $title.append($faveCount);
    if($('.logged-in').length) {
      var $faveBtn = $('<span class="fa fa-star fa-3x">').addClass('favorite').data('list-id', list.id);
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
      var $counter = $(event.target).closest('div').siblings('.counter');
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
  $("input[type='Submit'").click(newList);
});
