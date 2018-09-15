/* Scripts here */

import $ from 'jquery';
import GMaps from 'gmaps';
import AppearOnLoad from './AppearOnLoad.js';
import ParallaxImg from './ParallaxImg.js';
window.jQuery = $;
import 'owl.carousel';

import waypoints from '../../node_modules/waypoints/lib/noframework.waypoints';

new Waypoint({
      element: $('.parallax-container')[0],
      handler: function(direction) {
        if (direction == "down") {
          console.log('TEST-DOWN!!!!');
          $('.parallax-btn').css({"border" : "10px solid red"});
        }else {
          console.log('TEST-UP!!!!!');
          $('.parallax-btn').css({"border" : "10px solid green"});
        }
      }
});

console.log('Javascript working.');

$(document).ready(function() {
  console.log('jQuery working.');

  //$('#lightSliderFull').lightSlider({item: 1, autoWidth: true, loop: true, auto: true, addClass: "lightSliderFull"});
  $('#lightSlider').lightSlider();

  $("#full-width-slideshow").owlCarousel({
    //navigation : true, // Show next and prev buttons
    dots: false,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    smartSpeed : 1500,
    paginationSpeed : 400,
    items : 1,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false
  });

});

new AppearOnLoad();

new ParallaxImg();

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
      alert('You clicked on this marker!');
    }
  });
}

initMap();
