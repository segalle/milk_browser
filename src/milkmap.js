var map;

function initialize() {
	var mapOptions = {
		zoom: 7,
      	center: new google.maps.LatLng(31.046051,34.851612),
      	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions); 
    var script = document.createElement('script');
    script.src = 'milk.geojson';
    document.getElementsByTagName('head')[0].appendChild(script);
    
    if(navigator.geolocation) {
    	browserSupportFlag = true;
    	navigator.geolocation.getCurrentPosition(function(position) {
      		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      		map.setCenter(initialLocation);
      		map.setZoom(17);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }
  }

window.eqfeed_callback = function(results) {
	var markers = [];
	for (var i = 0; i < results.features.length; i++) {
		var coords = results.features[i].geometry.coordinates;
		var latLng = new google.maps.LatLng(coords[1],coords[0]);
		var marker = new google.maps.Marker({position: latLng, map: map});
        markers.push(marker);
    }
    var markerCluster = new MarkerClusterer(map, markers);
  };
 