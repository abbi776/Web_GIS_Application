// creating and adding map feature

let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
})
osm.addTo(map)

// adding popup to each feature
function popUPinfo(feature, layer) {
layer.bindPopup(feature.properties.NIMI)
}


// add geoJSON polygons layer of tartu city districts
async function addDistrictsGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const polygons = L.geoJson(data, {
onEachFeature: popUPinfo,
})
polygons.addTo(map)
}
addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')



// add geoJSON layerof cell towers location
async function addCelltowersGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const markers = L.geoJson(data)
const clusters = L.markerClusterGroup()
clusters.addLayer(markers)
clusters.addTo(map)
}
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')


// default map settings for default view button
function defaultMapSettings() {
map.setView([58.373523, 26.716045], 12)
}
