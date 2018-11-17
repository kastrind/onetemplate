/* Scripts here */

import $ from 'jquery';
window.jQuery = $;

import Header from './Header';
import NavMenu from './NavMenu';
import BackToTop from './BackToTop';
import AppearOnLoad from './AppearOnLoad';
import ParallaxImg from './ParallaxImg';
import GMaps from 'gmaps';
import Modal from './Modal';

import 'owl.carousel';
import lightSlider from '../../node_modules/lightslider/dist/js/lightslider';
import lightbox from '../../node_modules/lightbox2/dist/js/lightbox';
import waypoints from '../../node_modules/waypoints/lib/noframework.waypoints';
import lazySizes from '../../node_modules/lazysizes/lazysizes';

new Header();

new NavMenu();

new BackToTop("75%");

console.log('Javascript working.');

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

new Modal();

$(window).on("load", function () {
  initMap();
});
