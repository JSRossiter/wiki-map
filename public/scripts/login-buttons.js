// returns jquery form with submit button value as specified input
function createLoginForm (input) {
  var $form = $('<form>');
  var $input = $('<input type="text" name="username">');
  var $submit = $('<input type="submit">').attr('value', input);
  return $form.append($input, $submit);
}

function loginNavButton (event) {
  event.preventDefault();
  $('.container').empty();
  $('.container').append(createLoginForm("Login"));
  $('input[type="submit"]').click(function (event) {
    event.preventDefault();
    $.ajax({
      url: '/login',
      method: 'POST',
      data: $('form').serialize()
    });
  });
}

function registerNavButton (event) {
  event.preventDefault();
  $('.container').empty();
  $('.container').append(createLoginForm("Register"));
  $('input[type="submit"]').click(function (event) {
    event.preventDefault();
    $.ajax({
      url: '/register',
      method: 'POST',
      data: $('form').serialize()
    });
  });
}

function logout () {
  // toggle buttons
}

function logoutButton (event) {
  $.ajax({
    url: '/logout',
    method: 'POST',
    success: logout
  })
}

$(function() {
  $('.logout').click(logoutButton);
  $('.register').click(registerNavButton);
  $('.login').click(loginNavButton);
});
