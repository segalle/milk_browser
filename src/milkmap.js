var map;

  function initialize() {
    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(2.8,-187.3),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
          mapOptions);

    var script = document.createElement('script');
    script.src = 'milk.geojson';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  window.eqfeed_callback = function(results) {
    for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
  }
 