import $ from 'jquery';
window.jQuery = $;

class NavMenu {
	constructor() {
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header .header-nav-btn");
		this.menuContent = $(".site-header nav.menu");
		this.events();
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	toggleTheMenu() {
		this.menuContent.toggleClass("menu-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("header-nav-btn-close");
	}
}
export default NavMenu;
