/* Scripts here */

import $ from 'jquery';
window.jQuery = $;

import Header from './Header';
import NavMenu from './NavMenu';
import Sidebar from './Sidebar';
import BackToTop from './BackToTop';
import AppearOnLoad from './AppearOnLoad';
import ParallaxImg from './ParallaxImg';
import GMaps from 'gmaps';
import Modal from './Modal';

import 'owl.carousel';
import lightSlider from '../../node_modules/lightslider/dist/js/lightslider';
import lightGallery from '../../node_modules/lightgallery/dist/js/lightgallery-all';
import lightbox from '../../node_modules/lightbox2/dist/js/lightbox';
import waypoints from '../../node_modules/waypoints/lib/noframework.waypoints';
import lazySizes from '../../node_modules/lazysizes/lazysizes';
import fa from '../../node_modules/@fortawesome/fontawesome-free/js/regular';

new Header();

//          internal references' offset
new NavMenu("30%");

new Sidebar();

//            offset, duration, timing_function
new BackToTop("75%", 900, "swing");

console.log('Javascript working.');

var initMap = function() {
  if (constants) {
    var map = new GMaps({
      el: '#map',
      lat: constants['gmap']['lat'],
      lng: constants['gmap']['lng'],
      zoom: constants['gmap']['zoom'],
      styles: constants['gmap']['styles']
    });

    constants['gmap']['markers'].forEach( function(marker) {
      var infowindow = new google.maps.InfoWindow({
        content: marker['infowindow']
      });
      map.addMarker({
        title: marker['title'],
        lat: marker['lat'],
        lng: marker['lng'],
        click: function(e) {
          infowindow.open(map, this);
        }
      });
    });
  }
}

$(document).ready(function() {

  console.log('jQuery working.');

  //$('#lightSliderFull').lightSlider({item: 1, autoWidth: true, loop: true, auto: true, addClass: "lightSliderFull"});
  $('#lightSlider').lightSlider({
    item: 3,
    auto: true,
    loop: true,
    controls: false,
    pager: false,
    responsive: [
        {
          breakpoint: 768,
          settings: {
            item: 3,
            slideMove: 1,
            slideMargin: 6,
          }
        },
        {
          breakpoint: 460,
          settings: {
            item: 2,
            slideMove: 1
          }
        }
    ]
  });

  $("#lightGallery").lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    thumbItem: 7,
    slideMargin: 0,
    enableDrag: false,
    currentPagerPosition: 'left',
    onSliderLoad: function(el) {
      el.lightGallery({
        selector: '#lightGallery .lslide'
      });
    }     
  });

  var owl = $('#full-width-slideshow');

  owl.owlCarousel({
    //navigation : true, // Show next and prev buttons
    dots: false,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    autoHeight: false,
    smartSpeed: 1500,
    paginationSpeed: 400,
    items: 1,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false
  });

  // first slide slogan animation
  $(window).on("load", function(event) {
    TweenMax.fromTo($('.owl-item.active .slide-slogan'), 9, {opacity: 0, right: 0}, {opacity: .8,  right: '80%', repeat: -1});
  });

  // slogan animations for the next slides
  owl.on('changed.owl.carousel', function(event) {
    var cur_slogan = $(this).find(".owl-stage").children().eq(event.item.index).find(".slide-slogan");
    var test = TweenMax.fromTo(cur_slogan, 9, {opacity: 0, right: 0}, {opacity: .8,  right: '80%', repeat: -1});
  });

});

new AppearOnLoad();

new ParallaxImg();

new Modal();

$(window).on("load", function () {
  
  initMap();

  TweenMax.from(".logo", 3, {y:"50%", x:"50%", opacity:0, scale:2});

});
