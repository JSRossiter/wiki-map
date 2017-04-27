// initialize map
var map;
var marker;
var currentMarker;
// takes an array of point objects, places markers, binds popups and sets view
function addMarkers (points) {
  var markers = [];
  for (point of points) {
    var marker = L.marker(point.coordinates.split(",")).addTo(map).bindPopup(createPopup(point));
    $(marker).data("id", point.id);
    $(marker).click(function (event) { currentMarker = event.target })
    markers.push(marker);
  }
  var group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.5), {maxZoom: 15});
}

// returns html element to be used as a popup when given a point object
function createPopup (point) {
  var $div = $("<div>");
  var $title = $("<h4>").text(point.title);
  var $edit = $("<a>").text("Edit").click(editPoint);
  var $description = $("<p>").text(point.description);
  $div.append($title, $edit, $description);
  if(point.image) {
    var $img = $("<img>").attr("src", point.image).width(100);
    $div.append($img);
  }
  return $div[0];
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

function isValidImageUrl(url, callback) {
  var img = new Image();
  img.onerror = function() { flashMessage("Please enter a valid image URL") }
  img.onload =  callback;
  img.src = url;
}

function deletePoint (event) {
  $.ajax({
    url: '/points/' + $(currentMarker).data("id"),
    method: 'DELETE',
    succes: function () {
      map.removeLayer(currentMarker);
    }
  });
}

function editPoint (event) {
  event.preventDefault();
  currentMarker.unbindPopup().closePopup();
  currentMarker.dragging.enable();
  currentMarker.bindPopup(newPointForm(currentMarker._latlng, postPointEdit)).openPopup();

  $('.new-marker-form').append($('<a>').text("delete").click(deletePoint));

  var isDragging = false;
  currentMarker.on('dragstart', function (event) {
    isDragging = true;
  });
  currentMarker.on('dragend', function(event){
    currentMarker = event.target;
    var coords = currentMarker.getLatLng();
    currentMarker.setLatLng(coords, {id:10, draggable:'true'});
    currentMarker.openPopup();
    isDragging = false;
    $("input[name='list']").val(coords.lat + ',' + coords.lng);
  });
}


function postPointEdit () {
  var $point = $(".new-marker-form");
  $.ajax({
    url: '/points/edit/' + $(currentMarker).data("id"),
    method: 'POST',
    data: $point.serialize(),
    success: function (data) {
      currentMarker.dragging.disable();
      currentMarker.off('popupclose');
      currentMarker.closePopup();
      currentMarker.unbindPopup();
      currentMarker.bindPopup(createPopup(data)).openPopup();
    }
  });
}

function postPoint () {
  var $point = $(".new-marker-form");
  $.ajax({
    url: '/points/new',
    method: 'POST',
    data: $point.serialize(),
    success: function (data) {
      marker.dragging.disable();
      marker.off('popupclose');
      marker.closePopup();
      marker.unbindPopup();
      marker.bindPopup(createPopup(data)).openPopup();
    }
  });
}

function newPoint (event) {
  event.preventDefault();
  if (!$("input[name='title']").val()) {
    flashMessage("Please enter a title");
  } else if ($("input[name='image']").val()) {
    isValidImageUrl($("input[name='image']").val(), event.data.post)
  } else {
    event.data.post();
  }
}

function newPointForm (coords, cb) {
  var $div = $("<div>");
  var $form = $("<form>").addClass("new-marker-form");
  var $title = $("<input type='text' name='title'>");
  var $description = $("<input type='text' name='description'>");
  var $image = $("<input type='text' name='image'>");
  // hidden input field for list and coords
  var $coords = $("<input type='hidden' name='coords'>").val(coords.lat + ',' + coords.lng);
  // TODO add list id
  var $list = $("<input type='hidden' name='list'>").val(1);
  var $submit = $("<input type='submit'>");
  $submit.on("click", {post: cb}, newPoint);
  $form.append($title, $description, $image, $submit)
  $div.append($form);
  return $div[0];
}


function onMapClick(e) {
  event.preventDefault();

  marker = new L.marker(e.latlng, {id:10, draggable:'true'}).bindPopup(newPointForm(e.latlng, postPoint), {
    closeOnClick: false,
    keepInView: true
  });
  var isDragging = false;
  marker.on('dragstart', function (event) {
    isDragging = true;
  });

  marker.on('dragend', function(event){
    marker = event.target;
    var coords = marker.getLatLng();
    marker.setLatLng(coords,{id:10,draggable:'true'});
    marker.openPopup();
    isDragging = false;
    $("input[name='list']").val(coords.lat + ',' + coords.lng);
  });

  marker.on('popupclose', function(e) {
    setTimeout(function() {
      if (isDragging == false) {
        map.removeLayer(e.target);
      }
    }, 100);
  });

  map.addLayer(marker)
  marker.openPopup();
};

$(document).ready(function() {
  $.ajax({
    url: document.URL + '/points',
    method: 'GET',
    success: addMarkers
  });
  map = L.map('map', {
    center: [49.2827, -123.1207],
    zoom: 13
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiamVmZnJvc3NpdGVyIiwiYSI6ImNqMXprYm9kOTAyNTcyd240dmJ3ZmMwdGsifQ.npV7wcL8ZtbMgGsQ4gL99g'
  }).addTo(map);

  $("#map").height($(window).height() - 150);
  map.invalidateSize();


  var test = [{
    id: 1,
    title: "tacofino",
    description: "some pretty decent tacos",
    image: "https://pbs.twimg.com/profile_images/697941981704552448/Y-zl5UYk.jpg",
    coordinates: "49.2827202,-123.1048181"
  },
  {
    id: 2,
    title: "annalena",
    description: "they have chocolate chicken skin, what else is there to say",
    image: "http://static1.squarespace.com/static/5480d9cbe4b0e3ea019971a8/t/54a8ffdfe4b0243cdd54e363/1492718212399/?format=1500w",
    coordinates: "49.2708219,-123.1467779"
  }];
  addMarkers(test);
  map.on('click', onMapClick);
});
