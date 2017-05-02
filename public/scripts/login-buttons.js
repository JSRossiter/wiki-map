// returns jquery form with submit button value as specified input
function createLoginForm (input) {
  var $form = $('<form class="container">');
  var $input = $('<input type="text" name="username" class="col-sm-offset-2 col-sm-6">');
  var $submit = $('<input type="submit" class="btn-primary">').attr('value', input);
  return $form.append($input, $submit);
}

function loginNavButton (event) {
  event.preventDefault();
  $('section').empty();
  $('section').append(createLoginForm("Login"));
  $('input[type="submit"]').click(function (event) {
    event.preventDefault();
    $.ajax({
      url: '/login',
      method: 'POST',
      data: $('form').serialize(),
      success: function(data) {
        window.location.replace("/");
      }
    });
  });
}

function registerNavButton (event) {
  event.preventDefault();
  $('section').empty();
  $('section').append(createLoginForm("Register"));
  $('input[type="submit"]').click(function (event) {
    event.preventDefault();
    $.ajax({
      url: '/register',
      method: 'POST',
      data: $('form').serialize(),
      success: function(data) {
        window.location.replace("/");
      }
    });
  });
}

function logoutButton (event) {
  $.ajax({
    url: '/logout',
    method: 'POST',
    success: function(data) {
      window.location.replace("/");
    }
  });
}

$(function() {
  $('.logout').click(logoutButton);
  $('.register').click(registerNavButton);
  $('.login').click(loginNavButton);
});
