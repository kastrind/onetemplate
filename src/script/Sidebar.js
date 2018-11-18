
import $ from 'jquery';
window.jQuery = $;

class Sidebar {
  constructor() {
    this.showSidebarButton = $(".show-sidebar");
    this.sidebar = $(".sidebar");
    this.hideSidebarButton = $(".sidebar-hide");
    this.main = $(".main");
    this.siteHeader = $(".site-header");
    this.events();
  }

  events() {
    //clicking the show sidebar button
    this.showSidebarButton.click(this.showSidebar.bind(this));

    //clicking the hide sidebar button
    this.hideSidebarButton.click(this.hideSidebar.bind(this));

    //pushes any key
    $(document).keyup(this.keypressHandler.bind(this));
  }

  keypressHandler(e) {
    if (e.keyCode == 27) {
      this.hideSidebar();
    }
  }

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.addClass("sidebar-is-visible");
    this.main.addClass("main-squashed");
    if (this.siteHeader.hasClass("site-header-fixed")) {
      this.siteHeader.addClass("site-header-fixed-squashed");
    }
  }

  hideSidebar(e) {
    e.preventDefault();
    this.sidebar.removeClass("sidebar-is-visible");
    this.main.removeClass("main-squashed");
    this.siteHeader.removeClass("site-header-fixed-squashed");
  }
}

export default Sidebar;
