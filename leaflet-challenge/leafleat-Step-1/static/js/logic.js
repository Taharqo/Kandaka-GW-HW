//CODE EXPLINATION:
// 1) Logic for generating the base map: 
//    - the code "graymap.addTo(map);" places the map on top of the background tile layer which is 
//      defined by L.tileLayer and stored in the variable "graymap" and will render them as if they are a single image.
// 2) Json:
//    - How JSON is loaded: d3.json sends an asynchronous http requst to the earthquake url and loads a .json file 
//                          or data and it executes a call back function with the parsed json data objects.
//    - How was the data traversed: a call to the function "styleInfo" grabs each feature from the Geojson
//                          and makes a call to the 2 functions "getColor" & "getRadius" to give each earthquake 
//                          instance color and radius based on the earthquake's magnitude .
//    - How the json info is rendered on the map: the visuals from "L.geojson" are rendered on to the map by using
//                          ".addTo(map)" 
//  3) generating circles: the function "getRadius" is passed the magnitude. If the magnitude equals 0 then
//                          the function returns 1 otherwise the function returns the earthquake magnitude 
//                          multiplied by 4 which will set the radios of the circle to 4 times the size of the
//                          earthquake magnitutde
//  4) Tectonic plates generated:
//  5) What are the components in the layer control? How were they generated?
//  6) base map (tile layer) vs data layer(s):
//     - Only one base layer can render at a time. In this code we have one base layer "L.tilelayer".
//     - a base layer can have multiple data layers add on top of the base layer. we added a circle on top of
//        base layer such that the size & darkness of the circle determine the earthquakes magnitude. 
//        the bigger/darker the cirecle the larger the magnitude. 
//  7) Legend generation and rendering logic: An anonymous function that generates the legend is assigned to "legend.onAdd".
//                        That anonymous funtion creates a div which is added to the HTML code and contains a color 
//                        coded range from 0 to 5.     
//                  

// We create the tile layer that will be the background of our map.

var apiKey = 'I added my api key to get the immage to render';

var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: apiKey
});

// We create the map object with options.
var map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

// Then we add our 'graymap' tile layer to the map.
graymap.addTo(map);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  console.log(data)

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    console.log(feature)
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);
});
