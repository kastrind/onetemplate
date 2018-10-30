import $ from 'jquery';
window.jQuery = $;

class SmoothScroll {

  constructor(element) {
    var target = $(element).attr('href');
    var $target = $(target);
    $('html, body').stop().animate({'scrollTop': $target.offset().top}, 900, 'swing', function () {
        window.location.hash = target;
    });
  }

}

export default SmoothScroll;
