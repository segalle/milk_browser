var map;

var Milk = {};


var goldStar = {
    path : 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor : "yellow",
    fillOpacity : 0.8,
    scale : 0.1,
    strokeColor : "gold",
    strokeWeight : 14
};

var showPosition = function(position) {
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({
        icon : goldStar,
        position : userLatLng,
        title : 'Your Location',
        map : map
    });
};

function processGeoJSON(results) {

    Milk.geojson = results;

    var markers = [];
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
            position : latLng,
            map : map
        });
        markers.push(marker);
    }
    var markerCluster = new MarkerClusterer(map, markers);

};

function initialize() {

    var mapOptions = {
        zoom : 7,
        center : new google.maps.LatLng(31.046051, 34.851612),
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	//------------------------------------------
	$.get('milk.geojson', {}, processGeoJSON, 'json');
	  
	  
	  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  // var marker = new google.maps.Marker({
      // position: myLatlng,
      // map: map,
      // title: 'Uluru (Ayers Rock)'
  // });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
	});
	
	//------------------------------------------


    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            map.setZoom(17);

            showPosition(position);

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
        // TODO: maybe nothing
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


$(initialize);