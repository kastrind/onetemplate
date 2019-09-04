import $ from 'jquery';
window.jQuery = $;
import SmoothScroll from './SmoothScroll';

class BackToTop {

	constructor(offset, duration, timing_func) {
		this.backToTopElem = $(".back-to-top");
		this.backToTopHref = this.backToTopElem.parent().attr('href');
		this.triggerElem = $("[data-trigger-back-to-top=true]");
		if (!this.triggerElem.length) {
			this.triggerElem = $('body');
		}
		this.offsetPercentage = offset;
		this.duration = duration;
		this.timing_func = timing_func;
		this.events();
		this.hideInitially();
		this.createWaypoints();
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
					that.backToTopElem.parent().attr('href', that.backToTopHref);
				}else {
					that.backToTopElem.addClass("back-to-top-hidden");
					that.backToTopElem.parent().removeAttr('href');
				}
			},
			offset: that.offsetPercentage
		});
	}

	events() {
		this.backToTopElem.click(function(e) {
			e.preventDefault();
			new SmoothScroll(this.backToTopElem.parent(), 0, this.duration, this.timing_func);
		}.bind(this));
	}

}

export default BackToTop;
