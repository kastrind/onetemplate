/* Scripts here */

import $ from 'jquery';
window.jQuery = $;
//require('../../node_modules/lightslider/dist/js/lightslider.js');

alert('this is just a test');
$(document).ready(function() {
  alert('jQuery works!');
  $('#lightSlider').lightSlider();
});
