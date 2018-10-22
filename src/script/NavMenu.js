import $ from 'jquery';
window.jQuery = $;

class NavMenu {
	constructor() {
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header .header-nav-btn");
		this.menuContent = $(".site-header nav.menu");
		this.menuItem = $(".site-header nav.menu ul li a");
		this.subMenu = $(".site-header nav.menu ul li > ul");
		this.events();
	}

	events() {
		//toggle the menu on click of the hamburger icon
		this.menuIcon.click(this.toggleTheMenu.bind(this));

		//on hovering over a menu item, show its submenu, if not already visible
		this.menuItem.on("mouseenter", function (event) {
			if ($(event.target).next("ul:first").is(":not(:visible)"))
			this.setSubMenu(event, 'show');
		}.bind(this));

		//on hovering away from a menu item, hide its submenu
		this.subMenu.on("mouseleave", function (event) {
			this.setSubMenu(event, 'hide');
		}.bind(this));

		//on click of the menu item, show or hide its submenu
		this.menuItem.on("click", function (event) {
				setTimeout(function(event) {
					let adj_ul = $(event.target).next("ul:first");
					if (adj_ul.is(":not(:visible)")) {
						adj_ul.slideDown();
					}else if (adj_ul.is(":visible")) {
						adj_ul.slideUp();
					}
				}.bind(this, event), 300);
		}.bind(this));

		//on click of something outside the menu, hide all submenus
		$(document).on("click", function (event) {
			if ($(event.target).closest(this.menuContent)[0]==null) {
				$(this.subMenu).slideUp();
			}
		}.bind(this));

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

	setSubMenu(event, status) {
		if (status=='show') {
			$(event.target).next("ul:first").slideDown();
		}else if (status=='hide') {
			$(event.currentTarget).find("ul").slideUp();
			$(event.currentTarget).slideUp();
		}
	}
}
export default NavMenu;
