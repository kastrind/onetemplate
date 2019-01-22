import $ from 'jquery';
window.jQuery = $;

class ParallaxImg {

  constructor() {
    this.container = $("div.parallax-container");
    this.img = $("div.parallax-container").find(".parallax-img");
    this.events();
  }

  events() {
    $(document).scroll(function () {
      this.doParallaxScrolling();
    }.bind(this));

    var that = this;
    //do not do parallax scrolling if image shorter than its container
    $(window).on("load resize", function() {
      that.container.each(function () {
        let currContainer = $(this);
        let img = currContainer.find(".parallax-img");
        if (img.height() <= currContainer.height()) {
          img.css({"top": "50%", "transform": "translateY(-50%)"});
        }else {
          img.css({"top": "", "transform": ""});
        }
      });
    }.bind(that));
  }

  doParallaxScrolling() {
    this.container.each(function () {
      let img = $(this).find(".parallax-img");
      let correction = $(this).attr("data-scroll-start-correction");
      correction = (isNaN(correction)) ? 0 : correction;
      let inViewAmount = $(window).scrollTop() - $(this).offset().top + $(window).height() - correction;
      let factor = $(this).attr("data-scroll-factor");
      factor = (isNaN(factor)) ? img.height() / $(window).height() : factor;
      let scrollAmount = inViewAmount * factor;
      // console.log(inViewAmount+" "+scrollAmount);
      if (inViewAmount > 0 && scrollAmount <= img.height() - $(this).height()) {
        img.css({"top": -scrollAmount});
      }
    });
  }

}

export default ParallaxImg;
