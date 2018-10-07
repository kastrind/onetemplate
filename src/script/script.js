/* Scripts here */

import $ from 'jquery';
import GMaps from 'gmaps';
import AppearOnLoad from './AppearOnLoad.js';
import ParallaxImg from './ParallaxImg.js';
import BackToTop from './BackToTop.js';
window.jQuery = $;
import 'owl.carousel';

import waypoints from '../../node_modules/waypoints/lib/noframework.waypoints';

new BackToTop("75%");

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
    autoHeight: false,
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
