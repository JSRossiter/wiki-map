// initialize map
var map;
var marker;
var currentMarker;
// takes an array of point objects, places markers, binds popups and sets view
function addMarkers (points) {
  var markers = [];
  for (point of points) {
    var coords = L.latLng(point.coordinates.x, point.coordinates.y);
    var marker = L.marker(coords).addTo(map).bindPopup(createPopup(point));
    $(marker).data("id", point.id);
    $(marker).click(function (event) { currentMarker = event.target })
    markers.push(marker);
  }
  if (points.length) {
    var group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.5), {maxZoom: 15});
  }
}

// returns html element to be used as a popup when given a point object
function createPopup (point) {
  var $div = $("<div>").addClass("point-popup");
  var $title = $("<h4>").text(point.title);
  var $description = $("<p>").text(point.description);
  $div.append($title, $description);
  if(point.image) {
    var $img = $("<img>").attr("src", point.image).width(100);
    $div.append($img);
  }
  if($('.logged-in').length) {
    var $edit = $("<a>").text("Edit").click(editPoint);
    $div.append($edit);
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
  event.preventDefault();
  $.ajax({
    url: '/points/' + $(currentMarker).data("id"),
    method: 'DELETE',
    success: function () {
      map.removeLayer(currentMarker);
    }
  });
}

function editPoint (event) {
  event.preventDefault();

  var title = $('.point-popup h4').text();
  var description = $('.point-popup p').text();
  var image = $('.point-popup img').attr('src');
  var coordinates = currentMarker._latlng;

  currentMarker.unbindPopup().closePopup();
  currentMarker.dragging.enable();
  currentMarker.bindPopup(newPointForm(currentMarker._latlng, postPointEdit)).openPopup();

  $('.new-point-form').append($('<button>').text("Delete").click(deletePoint));
  $("input[name='title']").val(title)
  $("input[name='description']").val(description)
  $("input[name='image']").val(image)

  var isDragging = false;
  currentMarker.on('dragstart', function (event) {
    isDragging = true;
  });
  currentMarker.on('dragend', function (event){
    currentMarker = event.target;
    var coordinates = currentMarker.getLatLng();
    currentMarker.setLatLng(coordinates, {id:10, draggable:'true'});
    currentMarker.openPopup();
    isDragging = false;
    $("input[name='coordinates']").val(coordinates.lat + ',' + coordinates.lng);
  });
  currentMarker.on('popupclose', function (event) {
    setTimeout(function() {
      if (isDragging === false) {
        var point = {
          title,
          description,
          image
        };
        event.target.setLatLng(coordinates);
        event.target.dragging.disable();
        event.target.off('popupclose');
        event.target.closePopup();
        event.target.unbindPopup();
        event.target.bindPopup(createPopup(point));
      }
    }, 100);
  });
  $('.leaflet-popup-close-button').click(function () {
    setTimeout(function () {
      currentMarker.openPopup();
    }, 100);
  });
}

function postPointEdit () {
  var $point = $(".new-point-form");
  $.ajax({
    url: '/points/edit/' + $(currentMarker).data("id"),
    method: 'PUT',
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
  var $point = $(".new-point-form");
  $.ajax({
    url: '/points/new',
    method: 'POST',
    data: $point.serialize(),
    success: function (data) {
      console.log("postPoint data:", data);
      marker.dragging.disable();
      marker.off('popupclose');
      marker.closePopup();
      marker.unbindPopup();
      marker.bindPopup(createPopup(data)).openPopup();
      currentMarker = marker;
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

function newPointForm (coordinates, cb) {
  var $div = $("<div>");
  var $form = $("<form>").addClass("new-point-form");
  var $titleLabel = $("<label>").attr("for", "title").text("Title");
  var $title = $("<input type='text' name='title' id='title'><br>");
  var $descriptionLabel = $("<label>").attr("for", "description").text("Description");
  var $description = $("<input type='text' name='description' id='description'><br>");
  var $imageLabel = $("<label>").attr("for", "image").text("Image URL");
  var $image = $("<input type='text' name='image' id='image'><br>");
  // hidden input field for list and coordinates
  var $coordinates = $("<input type='hidden' name='coordinates'>").val(coordinates.lat + ',' + coordinates.lng);
  var $list_id = $("<input type='hidden' name='list_id'>").val($('main').data('list-id'));
  var $submit = $("<input type='submit'>");
  $submit.on("click", {post: cb}, newPoint);
  $form.append($titleLabel, $title, $descriptionLabel, $description, $imageLabel, $image, $coordinates, $list_id, $submit)
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
    var coordinates = marker.getLatLng();
    marker.setLatLng(coordinates,{id:10,draggable:'true'});
    marker.openPopup();
    isDragging = false;
    $("input[name='coordinates']").val(coordinates.lat + ',' + coordinates.lng);
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
  if($('.logged-in').length) {
    map.on('click', onMapClick);
  }
});
