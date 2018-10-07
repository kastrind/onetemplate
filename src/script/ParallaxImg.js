import $ from 'jquery';
window.jQuery = $;

class ParallaxImg {

  constructor() {
    this.container = $("div.parallax-container");
    this.img = $("div.parallax-container").find(".parallax-img");
    this.events();
    this.correction = 150;
  }

  events() {
    $(document).scroll(function () {
      this.doParallaxScrolling();
    }.bind(this));

    //do not do parallax scrolling if image shorter than its container
    $(window).on("load resize", function() {
      if (this.img.height() <= this.container.height()) {
        this.img.css({"top": "50%", "transform": "translateY(-50%)"});
      }else {
        this.img.css({"top": "", "transform": ""});
      }
    }.bind(this));
  }

  doParallaxScrolling() {
    var that = this;
    this.container.each(function () {
      let img = $(this).find(".parallax-img");
      let inViewAmount = $(document).scrollTop() - $(this).offset().top + $(window).height() - that.correction;
      let factor = img.height() / $(window).height();
      let scrollAmount = inViewAmount * factor;
      //console.log(inViewAmount+" "+scrollAmount);
      if (inViewAmount > 0 && scrollAmount <= img.height() - $(this).height()) {
        img.css({"top": -scrollAmount});
      }
    });
  }

}

export default ParallaxImg;
