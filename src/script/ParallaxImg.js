import $ from 'jquery';
window.jQuery = $;

class ParallaxImg {

  constructor() {
    this.container = $("div.parallax-container");
    this.img = $("div.parallax-container").find("img");
    this.events();
  }

  events() {
    $(document).scroll(function () {
      this.doParallaxScrolling();
    }.bind(this));
  }

  doParallaxScrolling() {
    let inViewAmount = $(document).scrollTop() - this.container.offset().top + $(window).height();
    let factor = this.img.height() / $(window).height();
    let scrollAmount = inViewAmount * factor;
    if (inViewAmount > 0 && scrollAmount <= this.img.height() - this.container.height()) {
      this.container.find("img").css({"top": -scrollAmount});
    }
  }

}

export default ParallaxImg;
