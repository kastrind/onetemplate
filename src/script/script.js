/* Scripts here */

import $ from 'jquery';
import GMaps from 'gmaps';
window.jQuery = $;
//require('../../node_modules/lightslider/dist/js/lightslider.js');

console.log('Javascript working.');

$(document).ready(function() {
  console.log('jQuery working.');
  $('#lightSliderFull').lightSlider({item: 1, autoWidth: true, loop: true, auto: true, addClass: "lightSliderFull"});
  $('#lightSlider').lightSlider();

});

var initMap = function() {
  var map = new GMaps({
    el: '#map',
    lat: 35.51708,
    lng: 24.017993,
    zoom: 15
  });

  map.addMarker({
    title: 'Marker',
    lat: 35.51708,
    lng: 24.017993,
    click: function(e) {
      alert('You clicked in this marker!');
    }
  });
}

initMap();
