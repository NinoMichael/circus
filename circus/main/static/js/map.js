'use strict';

const mymap = L.map('map-leaflet').setView([-18.897566, 47.495818], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

let departure = new L.LatLng(-18.897566, 47.495818);
let arrival = new L.LatLng(-15.721488, 46.326854);
const polyline = L.polyline([departure, arrival], {color: 'red'}).addTo(mymap);

let departureIcon = L.icon({
    iconUrl: 'main/static/images/map-departure.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

let arrivalIcon = L.icon({
    iconUrl: 'main/static/images/map-arrival.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

L.marker(departureIcon).addTo(mymap);
L.marker(arrivalIcon).addTo(mymap);