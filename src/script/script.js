/* Scripts here */

import $ from 'jquery';
window.jQuery = $;

import Header from './Header';
import NavMenu from './NavMenu';
import Sidebar from './Sidebar';
import BackToTop from './BackToTop';
import AppearOnLoad from './AppearOnLoad';
import ParallaxImg from './ParallaxImg';
import Modal from './Modal';

import waypoints from '../../node_modules/waypoints/lib/noframework.waypoints';
import lazySizes from '../../node_modules/lazysizes/lazysizes';

new Header();

//          internal references' offset
new NavMenu("30%");

new Sidebar();

//            offset, duration, timing_function
new BackToTop("75%", 900, "swing");

console.log('Javascript working.');

var offset = 0;
var fetching = false;
var initial = true;

$(window).bind("load scroll", function() {
  //console.log('scrolled '+ $(window).scrollTop() + ", wh: "+ $(window).height()+ " dh: "+ $(document).height());
  var scroll_distance =  Math.ceil($(window).scrollTop());
  var wh = window.innerHeight; // $(window).height() is wrong on Chrome mobile!
  var dh = $(document).height();
  var url = new URL(window.location);
  var c = url.searchParams.get("category");
  var read_url = "https://www.zencode.gr/wcx_api/poi/read.php";
  read_url += c ? "?category="+c : "";
  if (c) {
	  $(".parallax-container .parallax-heading").css({"display": "none"});
	  $(".parallax-container .parallax-heading."+c).css({"display": ""});
  }

  //console.log("initial: " + initial + " fetching: " + fetching + " offset: " + offset + " wh: " + wh + " dh: " + dh + " scroll_distance: " + scroll_distance);

  if(initial || (scroll_distance + wh >= dh -20 && !fetching)) {
      $('.loadingMore').show();
      fetching = true;
      initial = false;

      $.ajax({
        dataType: "json",
        data: {"offset": offset},
        type: "GET",
        url: read_url,
        retryLimit: 3,
        retryCount: 0,
        complete: function(data, status) {
          //alert(data["responseText"]);return;//DEBUGGING
          if (data['status'] != 200) {
            var thisAjax = this;
            if (this.retryCount++ < this.retryLimit) { setTimeout(function() { $.ajax(thisAjax); }, 1000); return; }
            $('.loadingMore').hide();
            return;
          }
          var json = JSON.parse(data["responseText"]);
          $('.loadingMore').hide();
          for (var key in json) {
            var date = new Date(json[key]['extraction_date']);
            var img = json[key]['img'] ? "<img data-srcset=\""+json[key]['img']+"\" class=\"lazyload\" />" : "";
            var txt = json[key]['txt'] ? "<p>"+json[key]['txt']+"</p>" : "";
            var previewitem = "<div class=\"previewlist-item\">\
            <a target=\"_blank\" href=\""+json[key]['link']+"\">"+
            img+
            "<h4>"+json[key]['title']+"</h4>\
            <p>"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"</p>"+
            txt+"</a>\
          </div>";
            $("#previewlist > .previewlist").append(previewitem);
            offset++;
          }
          fetching = false;         
        }//end complete  
      });//end ajax call  

  }
});

$(document).ready(function() {

  console.log('jQuery working.');

  //$('#lightSliderFull').lightSlider({item: 1, autoWidth: true, loop: true, auto: true, addClass: "lightSliderFull"});
  // $('#lightSlider').lightSlider({
  //   item: 4,
  //   auto: true,
  //   loop: true,
  //   responsive: [
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           item: 3,
  //           slideMove: 1,
  //           slideMargin: 6,
  //         }
  //       },
  //       {
  //         breakpoint: 460,
  //         settings: {
  //           item: 2,
  //           slideMove: 1
  //         }
  //       }
  //   ]
  // });

});

new AppearOnLoad();

new ParallaxImg();

new Modal();

$(window).on("load", function () {

  TweenMax.from(".logo", 2, {y:-300, opacity:0, scale:1.5});

});
