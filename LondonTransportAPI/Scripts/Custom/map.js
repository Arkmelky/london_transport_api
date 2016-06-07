//
// GoogleMap
//
//

var map;//map obj
var markers = [];//array with all current markers

var mapDiv;//div container wich will be contain Map 
var londonLatLon = { lat: 51.509597, lng: -0.117073 };//center of The London and center point of map on start
var mapOptions = {
    center: londonLatLon,
    zoom: 10
};// contain settings for map ini.

//map ini
function initMap() {
    mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, mapOptions);
}

//set marker on map
function setMarkerOnMap(lat, lon, title, label) {
    var myLatlng = new google.maps.LatLng(lat, lon);
    var myMapOptions = {
        zoom: 13,
        center: myLatlng
    };
    map = new google.maps.Map(mapDiv, myMapOptions);

    var marker = new google.maps.Marker({
        map:map,
        position: myLatlng,
        title: title,
        label: label,
        animation:google.maps.Animation.DROP
    });
    marker.setMap(map);

    addMarkerToList(marker);
}

//get new marker
function getNewMarker(lat, lon, title, label) {
    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        map: map,
        position: myLatlng,
        title: title,
        label: label,
        animation: google.maps.Animation.DROP
    });

    return marker;
}

//add marker to array
function addMarkerToList(marker) {
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAllMarkers(myMap) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(myMap);
    }
}

// removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAllMarkers(null);
}

// shows any markers currently in the array.
function showAllMarkers() {
    var newMap = new google.maps.Map(mapDiv, mapOptions);
    setMapOnAllMarkers(newMap);
}

//overload showAllMarkers function with custom map center
function showAllMarkersWithCenter(lat, lon) {
    var myLatLng = new google.maps.LatLng(lat, lon);
    var myOptions = {
        zoom: 15,
        center: myLatLng
    };
    var newMap = new google.maps.Map(mapDiv, myOptions);
    setMapOnAllMarkers(newMap);
}

// deletes all markers in the array by removing references to them.
function deleteAllMarkers() {
    clearMarkers();
    markers = [];
}

