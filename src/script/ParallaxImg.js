import $ from 'jquery';
window.jQuery = $;

class ParallaxImg {

  constructor() {
    this.container = $("div.parallax-container");
    this.img = $("div.parallax-container").find("img");
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
    let inViewAmount = $(document).scrollTop() - this.container.offset().top + $(window).height() - this.correction;
    let factor = this.img.height() / $(window).height();
    let scrollAmount = inViewAmount * factor;
    console.log(inViewAmount+" "+scrollAmount);
    if (inViewAmount > 0 && scrollAmount <= this.img.height() - this.container.height()) {
      this.container.find("img").css({"top": -scrollAmount});
    }
  }

}

export default ParallaxImg;
