function renderList (lists) {
  for (list of lists) {
    $('.lists')
      .append($('<a>').attr('href', '/lists/' + list.id)
      .append($('<h2>').text(list.title)));
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

$(function() {
  var lists = [
    {title: "Best food in Vancouver", id: 1},
    {title: "Best cinemas", id: 2},
    {title: "Another one!", id: 3}
  ];
  renderList(lists);
  $.ajax({
    url: '/lists',
    method: 'GET',
    success: renderList
  });
  $("input[value='Submit'").click(newList);
});
