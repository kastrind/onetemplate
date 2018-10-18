import $ from 'jquery';
window.jQuery = $;

class BackToTop {

	constructor(offset) {
		this.backToTopElem = $(".back-to-top");
		this.triggerElem = $("[data-trigger-back-to-top=true]");
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWaypoints();
		this.events();
	}

	hideInitially() {
		this.backToTopElem.addClass("back-to-top-hidden");
	}

	createWaypoints() {
		var that = this;
		new Waypoint({
			element: that.triggerElem[0],
			handler: function(direction) {
				if (direction == "down") {
					that.backToTopElem.removeClass("back-to-top-hidden");
				}else {
					that.backToTopElem.addClass("back-to-top-hidden");
				}
			},
			offset: that.offsetPercentage
		});
	}

	smoothScroll() {
		var target = this.backToTopElem.parent().attr('href');
		var $target = $(target);
		$('html, body').stop().animate({'scrollTop': $target.offset().top}, 900, 'swing', function () {
				window.location.hash = target;
		});
	}

	events() {
		this.backToTopElem.click(function(e) {
			e.preventDefault();
			this.smoothScroll();
		}.bind(this));
	}

}

export default BackToTop;
