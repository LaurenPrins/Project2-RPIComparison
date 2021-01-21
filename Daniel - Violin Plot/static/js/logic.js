  
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [-31.950527, 115.860458],
    zoom: 13
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoiY3lydXNhdXlldW5nYyIsImEiOiJja2ppZnJla3k0dXY5MnNucDRwajY4MWsxIn0.Y49rKli6lAJRxKPEoI-N9A"
  }).addTo(myMap);
  
  var marker = L.marker([-31.950527, 115.860458], {
    draggable: true,
    title: "Location"
  }).addTo(myMap);
  
//   // Binding a pop-up to our marker
  marker.bindPopup("Perth City!");

  var marker = L.marker([-35.023819, 117.884727], {
    draggable: true,
    title: "Location"
  }).addTo(myMap);
  
//   // Binding a pop-up to our marker
  marker.bindPopup("Albany!");

  var marker = L.marker([-17.95215, 122.245049], {
    draggable: true,
    title: "Location"
  }).addTo(myMap);
  
//   // Binding a pop-up to our marker
  marker.bindPopup("Broome!");

  var marker = L.marker([-33.327419, 115.636093], {
    draggable: true,
    title: "Location"
  }).addTo(myMap);
  
//   // Binding a pop-up to our marker
  marker.bindPopup("Bunbury!");