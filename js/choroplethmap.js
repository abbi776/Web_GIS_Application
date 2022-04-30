// creating and adding map feature

let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
})
osm.addTo(map)

addGeoJson('geojson/tartu_city_districts_edu.geojson')

// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  L.choropleth(data, {
    valueProperty: 'TOWERS', // which property in the features to use
    scale: ['#fee5d9', '#a50f15'], // chroma.js scale - include as many as you like
    steps: 5, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#FFFF00', // border color
      weight: 2,
      fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('Value: ' + feature.properties.TOWERS)
    },
  }).addTo(map)
}

// default map settings for default view button
function defaultMapSettings() {
map.setView([58.373523, 26.716045], 12)
}
