// initialize map
var map;
// takes an array of point objects, places markers, binds popups and sets view
function addPoints (points) {
  var markers = [];
  for (var i = 0; i < points.length; i++) {
    markers.push(L.marker(points[i].coordinates).addTo(map).bindPopup(createPopup(points[i])));
  }
  var group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.5), {maxZoom: 15});
}

// returns html element to be used as a popup when given a point object
function createPopup (point) {
  var $div = $("<div>");
  var $title = $("<h4>").text(point.title);
  var $description = $("<p>").text(point.description);
  $div.append($title, $description);
  if(point.image) {
    var $img = $("<img>").attr("src", point.image).width(100);
    $div.append($img);
  }
  return $div[0];
}

function newMarkerForm (coords) {
  var $div = $("<div>");
  var $form = $("<form>");
  var $title = $("<input type='text' name='title'>");
  var $decription = $("<input type='text' name='decription'>");
  var $image = $("<input type='text' name='image'>");
  var $submit = $("<input type='submit'>");
  $submit.click(newMarker);
  $form.append($title, $description, $image, $submit)
  $div.append($form);
  return $div[0]
}

function onMapClick(e) {
  marker = new L.marker(e.latlng, {id:10, draggable:'true'}).bindPopup(newMarkerForm(e.latlng), {
    closeOnClick: false,
    keepInView: true
  });
  marker.openPopup();
  marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    console.log(position);
    marker.setLatLng(position,{id:10,draggable:'true'});
  });
  map.addLayer(marker);
};

$(document).ready(function() {
  // $.ajax({
  //   url: document.URL + '/points',
  //   method: 'GET',
  //   success: addPoints
  // });
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
    title: "tacofino",
    description: "some pretty decent tacos",
    image: "https://pbs.twimg.com/profile_images/697941981704552448/Y-zl5UYk.jpg",
    coordinates: [49.2827202, -123.1048181]
  },
  {
    title: "annalena",
    description: "they have chocolate chicken skin, what else is there to say",
    image: "http://static1.squarespace.com/static/5480d9cbe4b0e3ea019971a8/t/54a8ffdfe4b0243cdd54e363/1492718212399/?format=1500w",
    coordinates: [49.2708219, -123.1467779]
  }];
  addPoints(test);
  map.on('click', onMapClick);
});
