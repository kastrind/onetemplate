import $ from 'jquery';
window.jQuery = $;

class NavMenu {
	constructor() {
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header .header-nav-btn");
		this.menuContent = $(".site-header nav.menu");
		this.menuItem = $(".site-header nav.menu ul li a");
		this.subMenu = $(".site-header nav.menu ul li > ul");
		this.isMobile = null;
		this.events();
	}

	events() {
		//toggle the menu on click of the hamburger icon
		this.menuIcon.click(this.toggleTheMenu.bind(this));

		$(window).on("load resize", function () {
			let isMobile = this.subMenu.css("position") != 'absolute';
			let changed = isMobile != this.isMobile;
			this.isMobile = isMobile;
			if (changed) {
				//on mobile view
				if (this.isMobile) {
					//on touching a menu item, toggle its submenu visibility
					this.menuItem.on("click", this.handleTouches.bind(this));
					this.menuItem.off("mouseenter");
					this.subMenu.off("mouseleave");
				//on a larger view
				}else {
					this.menuItem.off("click");
					//on hovering over a menu item, show its submenu, if not already visible
					this.menuItem.on("mouseenter", this.handleMouseEnter.bind(this));
					//on hovering away from a menu item, hide its submenu
					this.subMenu.on("mouseleave", this.handleMouseLeave.bind(this));
				}
			}
		}.bind(this));

	}

	handleTouches(event) {
		console.log("yes!!!!");
		let adj_ul = $(event.target).next("ul:first");
		if (adj_ul.is(":not(:visible)")) {
			adj_ul.slideDown();
		}else if (adj_ul.is(":visible")) {
			adj_ul.slideUp();
		}
	}

	handleMouseEnter(event) {
		console.log("yes");
		let adj_ul = $(event.target).next("ul:first");
		if (adj_ul.is(":not(:visible)")) {
			adj_ul.slideDown();
		}
		clearTimeout(this.timer);

		var parent_ul = $(event.target).closest("ul");
		if (parent_ul[0]) {
			clearTimeout(parent_ul[0].timer);
		}
	}

	handleMouseLeave(event) {
		event.currentTarget.timer = setTimeout(function(event) {$(event.currentTarget).slideUp();}.bind(this, event), 1000);
	}

	toggleTheMenu() {
		if (this.menuIcon.hasClass("header-nav-btn-close")) {
			this.menuContent.slideUp();
			this.menuIcon.removeClass("header-nav-btn-close");
		}else {
			this.menuContent.slideDown();
			this.menuIcon.addClass("header-nav-btn-close");
		}
		//on resizing the window, make sure menu is not hidden
		$(window).on("resize", function() {
			this.menuContent.css({display: ""});
			this.menuIcon.removeClass("header-nav-btn-close");
		}.bind(this));
	}

}
export default NavMenu;
