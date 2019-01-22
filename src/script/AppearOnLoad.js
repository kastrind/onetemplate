import $ from 'jquery';
window.jQuery = $;

class AppearOnLoad {

  constructor() {
    this.overlay = $("div.disappear-on-load");
    this.events();
  }

  hideOnLoad() {
    this.overlay.addClass('disappeared-on-load');
    this.overlay.bind('transitionend', (function() {
      this.overlay.hide();
      this.overlay.trigger("onOverlayDisappear");}).bind(this) );
  }

  events() {
    $(window).on("load", this.hideOnLoad.bind(this));
  }

}

export default AppearOnLoad;
