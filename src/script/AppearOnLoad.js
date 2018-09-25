import $ from 'jquery';
window.jQuery = $;

class AppearOnLoad {

  constructor() {
    this.overlay = $("div.disappear-on-load");
    this.events();
  }

  hideOnLoad() {
    this.overlay.addClass('disappeared-on-load');
    this.overlay.bind('transitionend', (function() {this.overlay.hide();}).bind(this) );
  }

  events() {
    var self = this;
    $(window).on("load", self.hideOnLoad.bind(this));
  }

}

export default AppearOnLoad;
