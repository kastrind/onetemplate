import $ from 'jquery';
window.jQuery = $;

class SmoothScroll {

  constructor(element, offset_correction, time, timing_func) {
    var target = $(element).attr('href');
    var $target = $(target);
    $('html, body').stop().animate({'scrollTop': $target.offset().top + offset_correction}, time, timing_func, function () {
      if (!offset_correction) {
        window.location.hash = target;
      }
    });
  }

}

export default SmoothScroll;
