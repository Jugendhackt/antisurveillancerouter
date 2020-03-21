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

	L.Routing.control({
		waypoints: [
			L.latLng(57.74, 11.94),
			L.latLng(57.6792, 11.949)
		],
		router: L.Routing.graphHopper('f0697fa6-6b37-4a82-81b0-6dbf9170892c')
	}).addTo(mymap);
});

