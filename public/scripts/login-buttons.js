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

}

function registerNavButton (event) {
  event.preventDefault();
  $('.container').empty();
  $('.container').append(createLoginForm("Register"));
}

function logoutButton (event) {

}

$(function() {
  $('.logout').click(logoutButton);
  $('.register').click(registerNavButton);
  $('.login').click(loginNavButton);
})
