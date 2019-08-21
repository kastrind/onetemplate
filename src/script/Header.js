import $ from 'jquery';
window.jQuery = $;

class Header {

  constructor() {

    //the site header
    this.siteHeader = $(".site-header");

    //the site header rows the style of which to alternate
    this.siteHeaderRows = $(".site-header").find(".header-wrapper-row");

    //the element after which site header is revealed
    this.triggerPullDownSiteHeader = $("[data-trigger-pullDown-header=true]");

    if (!this.triggerPullDownSiteHeader.length) this.triggerPullDownSiteHeader = $("section").first();

    //the element after which the header hides
    this.triggerHideSiteHeader = $("[data-trigger-hide-header=true]");

    //the element to hide when site header is revealed
    this.hiddenWhenSiteHeaderPulledDown = $("[data-hide-when-header-pulled-down=true]");

    //the alternative logo in site header to show when site header is revealed
    this.altLogo = $(".site-header").find(".altLogo");

    //the logo in site header to shrink when site header is revealed, if alternative logo is not found
    this.logo = $(".site-header").find(".logo");

    //the hamburger icon the style of which to alternate
    this.menuIcon = $(".site-header .header-nav-btn");

    //the submenu the style of which to alternate
    this.subMenu = $(".site-header nav.menu ul li > ul");

    //in case page refreshed in the middle of the document:
    //if we are scrolling before the trigger, prepare header for pull down
    if (this.isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem()) {
      this.prepareHeaderForPullDown();
    }

    //site header height
    this.siteHeaderHeight = this.siteHeader.outerHeight();
    //Y position of the element after which site header is revealed
    this.triggerPullDownSiteHeaderOffsetTop = this.triggerPullDownSiteHeader.offset().top;
    //Y position of the element after which site header hides, if any
    this.triggerHideSiteHeaderOffsetTop = (this.triggerHideSiteHeader.length)
                                          ? this.triggerHideSiteHeader.offset().top
                                          : 0;

    //refresh these values on load resize of the window
    $(window).on("load resize", function() {
      this.scrollTop = $(window).scrollTop();
      this.siteHeaderHeight = this.siteHeader.outerHeight();
      this.triggerPullDownSiteHeaderOffsetTop = this.triggerPullDownSiteHeader.offset().top;
      this.triggerHideSiteHeaderOffsetTop = (this.triggerHideSiteHeader.length)
                                            ? this.triggerHideSiteHeader.offset().top
                                            : 0;
    }.bind(this));

    var prevScrollpos = window.pageYOffset;
    var consecutive_scrollups = 0;

    //on scroll,
    $(window).on("scroll", function () {

      var currentScrollPos = window.pageYOffset;

      //if we are scrolling before the trigger, prepare header for pull down
      if (this.isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem()) {
        this.prepareHeaderForPullDown();

      //if we are on top, restore header
      }else if (this.isScrollingBeforeHeader()) {
        this.restoreHeader();
      }else if ($(window).scrollTop() >= this.triggerPullDownSiteHeaderOffsetTop) {

        //when the user scrolls down, hide the navbar. When the user scrolls up, show the navbar
        if (prevScrollpos > currentScrollPos) { // a scroll up
          consecutive_scrollups++;
        } else { // a scroll down
          consecutive_scrollups = 0;
        }

        if (consecutive_scrollups >= 15) {
          this.siteHeader.removeClass("site-header-pushedUp");
        }else if (consecutive_scrollups == 0) {
          this.siteHeader.addClass("site-header-pushedUp");
        }

        prevScrollpos = currentScrollPos;

      }
      this.siteHeader = $(".site-header");
      this.subMenu = $(".site-header nav.menu ul li > ul");

    }.bind(this));

    //create waypoint for pulling down the header
    this.createPullDownHeaderWaypoint();

    this.sidebar = $(".sidebar");

    //the search field the style of which to alternate
    this.searchField = $(".site-header form[name='searchForm'] input[name='searchField']");

  }

  isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem() {
    return (this.triggerHideSiteHeaderOffsetTop)
            ?
            $(window).scrollTop() < this.triggerPullDownSiteHeaderOffsetTop &&
            $(window).scrollTop() > this.triggerHideSiteHeaderOffsetTop
            :
            $(window).scrollTop() > this.siteHeaderHeight &&
            $(window).scrollTop() < this.triggerPullDownSiteHeaderOffsetTop;
  }

  isScrollingBeforeHeader() {
    return (this.triggerHideSiteHeaderOffsetTop)
            ?
            $(window).scrollTop() <= this.triggerHideSiteHeaderOffsetTop
            :
            $(window).scrollTop() <= this.siteHeaderHeight;
  }

  prepareHeaderForPullDown() {
    this.siteHeader.addClass("site-header-pushedUp site-header-animated");
  }

  createPullDownHeaderWaypoint() {
    var that = this;
    that.siteHeader.addClass("site-header-animated");
    new Waypoint({
      element: that.triggerPullDownSiteHeader[0],
      handler: function(direction) {
        //if scrolling down reaching the trigger, pull down the header
        if (direction == "down") {
          that.pullDownHeader();
        //else if scrolling up away from the trigger, hide the header
        }else {
          that.siteHeader.addClass("site-header-pushedUp");
        }
      }
    });

  }

  restoreHeader() {
    this.searchField.removeClass("alt");
    this.subMenu.removeClass("alt");
    this.menuIcon.removeClass("alt");
    this.siteHeader.removeClass("site-header-alt");
    this.siteHeaderRows.removeClass("header-wrapper-row-alt");
    !this.altLogo[0] ? this.logo.removeClass("logo-shrunk") : this.altLogo.hide(), this.logo.show();
    this.siteHeader.removeClass("site-header-pushedUp site-header-fixed site-header-animated");
    this.hiddenWhenSiteHeaderPulledDown.css({display: ""});
    if (!this.sidebar.hasClass("sidebar-is-visible") || this.siteHeader.css("position") != "fixed") {
      this.siteHeader.removeClass("site-header-fixed-squashed");
    }
  }

  pullDownHeader() {
    this.searchField.addClass("alt");
    this.subMenu.addClass("alt");
    this.menuIcon.addClass("alt");
    this.siteHeader.addClass("site-header-alt");
    this.siteHeaderRows.addClass("header-wrapper-row-alt");
    !this.altLogo[0] ? this.logo.addClass("logo-shrunk") : this.altLogo.show(), this.logo.hide();
    this.hiddenWhenSiteHeaderPulledDown.css({display: "none"});
    this.siteHeader.removeClass("site-header-pushedUp").addClass("site-header-fixed");
    if (this.sidebar.hasClass("sidebar-is-visible")) {
      this.siteHeader.addClass("site-header-fixed-squashed");
    }
  }

}

export default Header;
