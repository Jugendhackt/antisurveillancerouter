$(document).ready(() => {

	var mymap = L.map('mapid').setView([57.74, 11.94], 11);
        
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	    maxZoom: 18,
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    id: 'mapbox/streets-v11',
	    tileSize: 512,
	    zoomOffset: -1
	}).addTo(mymap);
	//NO VAR KEYWORD this must be global
	routeControl = L.Routing.control({
		waypoints: [
			L.latLng(57.74, 11.94),
			L.latLng(57.6792, 11.949)
		],
		router: L.Routing.graphHopper(gh_token),
	}).addTo(mymap);
});

function blockdest(point) {
	routeControl._router = L.Routing.graphHopper(gh_token, {urlParameters: { 'ch.disable': true, block_area : '58.84, 13.95'}});
	routeControl.spliceWaypoints(-1, 1, point);
}

function blockstart (point) {
	routeControl._router = L.Routing.graphHopper(gh_token, {urlParameters: { 'ch.disable': true, block_area : '58.84, 13.95'}});
	routeControl.spliceWaypoints(0, 1, point);
}