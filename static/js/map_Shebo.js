// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [-31.950527, 115.860458],
    zoom: 6
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

 // An array containing each city's name, location, region, and population
var cities = [{
location: [-31.950527, 115.860458],
city: "Perth",
region: "Perth",
population: "2,042,000",
distance: "N/A"
},
{
  location: [-35.023819, 117.884727],
  city: "Albany",
  region: "Great Southern",
  population: "34,205",
  distance: "418km"
},
{
  location: [-17.95215, 122.245049],
  city: "Broome",
  region: "Kimberley",
  population: "14,445",
  distance: "1,681km"
},
{
  location: [-33.327419, 115.636093],
  city: "Bunbury",
  region: "South West",
  population: "85,620",
  distance: "175km"
},
{
  location: [-33.64994, 115.34463],
  city: "Busselton",
  region: "South West",
  population: "38,000",
  distance: "220km"
},
{
  location: [-32.22151, 116.00807],
  city: "Byford",
  region: "Peel",
  population: "14,908",
  distance: "32km"
},
{
  location: [-24.864031, 113.695953],
  city: "Carnarvon",
  region: "Gascoyne",
  population: "4,426",
  distance: "900km"
},
{
  location: [-17.30368, 123.630112],
  city: "Derby",
  region: "Kimberley",
  population: "3,325",
  distance: "2179.4km"
},
{
  location: [-33.81831, 121.838799],
  city: "Esperance",
  region: "Goldfields-Esperance",
  population: "12,145",
  distance: "720km"
},
{
  location: [-21.930719, 114.122391],
  city: "Exmouth",
  region: "Gascoyne",
  population: "2,486",
  distance: "1270km"
},
{
  location: [-25.432289, 116.097923],
  city: "Gascoyne",
  region: "Gascoyne",
  population: "315",
  distance: "1,129.9km"
},
{
  location: [-28.77305, 114.611229],
  city: "Geraldton",
  region: "Midwest",
  population: "32,440", 
  distance: "424km"
},
{
  location: [-33.83297, 121.91196],
  city: "Goldfields-Esperance",
  region: "Goldfields-Esperance",
  population: "N/A",
  distance: "594.1km"
},
{
  location: [-34.561450, 117.674850],
  city: "Great Southern",
  region: "Great Southern",
  population: "54,000",
  distance: "413km"
}, 
{
  location: [-30.74799, 121.476013],
  city: "Kalgoorlie",
  region: "Goldfields-Esperance",
  population: "29,160",
  distance: "595km"
}, 
{
  location: [-20.736691, 116.846802],
  city: "Karratha",
  region: "Pilbara",
  population: "19700",
  distance: "1526.4km"
}, 
{
  location: [-17.40375, 124.33964],
  city: "Kimberley",
  region: "Kimberley",
  population: "36,230", 
  distance: "2538.1km"
}, 
{
  location: [-32.53664, 115.742561],
  city: "Mandurah",
  region: "Peel",
  population: "86,000",
  distance: "72.1km"
}, 
{
  location: [-31.86357, 115.9969],
  city: "Midwest",
  region: "Midwest",
  population: "52,000",
  distance: "756.4km"
},
{
  location: [-32.93468, 117.17645],
  city: "Narrogin",
  region: "Wheatbelt",
  population: "4,274", 
  distance: "192km"
},
{
  location: [-31.654921, 116.671059],
  city: "Northam",
  region: "Wheatbelt",
  population: "11,206",
  distance: "97km"
},
{
  location: [-20.366859, 118.559258],
  city: "Port Hedland",
  region: "Pilbara",
  population: "15,144",
  distance: "1625.4km"
},
{
  location: [-34.0557, 116.0414],
  city: "South West",
  region: "South West",
  population: "68,000",
  distance: "275.5km"
},
{
  location: [-32.0334, 118.0953],
  city: "Wheatbelt",
  region: "Wheatbelt",
  population: "75,000", 
  distance: "243.8km"
},
];



    // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location) 
    .bindPopup("<h1>" + city.city + "</h1> <hr> <h3>Region: " + city.region + "</h3> <hr><h3>Population: " + city.population + "</h3> <hr><h3> To Perth: " + city.distance + "</h3>" )
    .addTo(myMap);
  }