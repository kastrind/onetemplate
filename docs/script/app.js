!function(e){function t(t){for(var s,n,o=t[0],l=t[1],d=t[2],u=0,c=[];u<o.length;u++)n=o[u],a[n]&&c.push(a[n][0]),a[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);for(h&&h(t);c.length;)c.shift()();return r.push.apply(r,d||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],s=!0,o=1;o<i.length;o++){var l=i[o];0!==a[l]&&(s=!1)}s&&(r.splice(t--,1),e=n(n.s=i[0]))}return e}var s={},a={2:0},r=[];function n(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=s,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var h=l;r.push([2,1,0]),i()}({2:function(e,t,i){"use strict";i.r(t);var s=i(0),a=i.n(s);window.jQuery=a.a;var r=class{constructor(){this.siteHeader=a()(".site-header"),this.siteHeaderRows=a()(".site-header").find(".header-wrapper-row"),this.triggerPullDownSiteHeader=a()("[data-trigger-pullDown-header=true]"),this.triggerPullDownSiteHeader.length||(this.triggerPullDownSiteHeader=a()("section").first()),this.triggerHideSiteHeader=a()("[data-trigger-hide-header=true]"),this.hiddenWhenSiteHeaderPulledDown=a()("[data-hide-when-header-pulled-down=true]"),this.altLogo=a()(".site-header").find(".altLogo"),this.logo=a()(".site-header").find(".logo"),this.menuIcon=a()(".site-header .header-nav-btn"),this.subMenu=a()(".site-header nav.menu ul li > ul"),this.isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem()&&this.prepareHeaderForPullDown(),this.siteHeaderHeight=this.siteHeader.outerHeight(),this.triggerPullDownSiteHeaderOffsetTop=this.triggerPullDownSiteHeader.offset().top,this.triggerHideSiteHeaderOffsetTop=this.triggerHideSiteHeader.length?this.triggerHideSiteHeader.offset().top:0,a()(window).on("load resize",function(){this.scrollTop=a()(window).scrollTop(),this.siteHeaderHeight=this.siteHeader.outerHeight(),this.triggerPullDownSiteHeaderOffsetTop=this.triggerPullDownSiteHeader.offset().top,this.triggerHideSiteHeaderOffsetTop=this.triggerHideSiteHeader.length?this.triggerHideSiteHeader.offset().top:0}.bind(this));var e=window.pageYOffset,t=0;a()(window).on("scroll",function(){var i=window.pageYOffset;this.isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem()?this.prepareHeaderForPullDown():this.isScrollingBeforeHeader()?this.restoreHeader():a()(window).scrollTop()>=this.triggerPullDownSiteHeaderOffsetTop&&(e>i?t++:t=0,t>=20?this.siteHeader.removeClass("site-header-pushedUp"):0==t&&this.siteHeader.addClass("site-header-pushedUp"),e=i),this.siteHeader=a()(".site-header"),this.subMenu=a()(".site-header nav.menu ul li > ul")}.bind(this)),this.createPullDownHeaderWaypoint(),this.sidebar=a()(".sidebar"),this.searchField=a()(".site-header form[name='searchForm'] input[name='searchField']")}isScrollingAfterHeaderAndBeforeTriggerPullDownHeaderElem(){return this.triggerHideSiteHeaderOffsetTop?a()(window).scrollTop()<this.triggerPullDownSiteHeaderOffsetTop&&a()(window).scrollTop()>this.triggerHideSiteHeaderOffsetTop:a()(window).scrollTop()>this.siteHeaderHeight&&a()(window).scrollTop()<this.triggerPullDownSiteHeaderOffsetTop}isScrollingBeforeHeader(){return this.triggerHideSiteHeaderOffsetTop?a()(window).scrollTop()<=this.triggerHideSiteHeaderOffsetTop:a()(window).scrollTop()<=this.siteHeaderHeight}prepareHeaderForPullDown(){this.siteHeader.addClass("site-header-pushedUp site-header-animated")}createPullDownHeaderWaypoint(){var e=this;e.siteHeader.addClass("site-header-animated"),new Waypoint({element:e.triggerPullDownSiteHeader[0],handler:function(t){"down"==t?e.pullDownHeader():e.siteHeader.addClass("site-header-pushedUp")}})}restoreHeader(){this.searchField.removeClass("alt"),this.subMenu.removeClass("alt"),this.menuIcon.removeClass("alt"),this.siteHeader.removeClass("site-header-alt"),this.siteHeaderRows.removeClass("header-wrapper-row-alt"),this.altLogo[0]?this.altLogo.hide():this.logo.removeClass("logo-shrunk"),this.logo.show(),this.siteHeader.removeClass("site-header-pushedUp site-header-fixed site-header-animated"),this.hiddenWhenSiteHeaderPulledDown.css({display:""}),this.sidebar.hasClass("sidebar-is-visible")&&"fixed"==this.siteHeader.css("position")||this.siteHeader.removeClass("site-header-fixed-squashed")}pullDownHeader(){this.searchField.addClass("alt"),this.subMenu.addClass("alt"),this.menuIcon.addClass("alt"),this.siteHeader.addClass("site-header-alt"),this.siteHeaderRows.addClass("header-wrapper-row-alt"),this.altLogo[0]?this.altLogo.show():this.logo.addClass("logo-shrunk"),this.logo.hide(),this.hiddenWhenSiteHeaderPulledDown.css({display:"none"}),this.siteHeader.removeClass("site-header-pushedUp").addClass("site-header-fixed"),this.sidebar.hasClass("sidebar-is-visible")&&this.siteHeader.addClass("site-header-fixed-squashed")}};window.jQuery=a.a;var n=class{constructor(e,t,i,s){var r=a()(e).attr("href"),n=a()(r);a()("html, body").stop().animate({scrollTop:n.offset().top+t},i,s,function(){t||(window.location.hash=r)})}};window.jQuery=a.a;var o=class{constructor(e){this.siteHeader=a()(".site-header"),this.menuIcon=a()(".site-header .header-nav-btn"),this.menuContent=a()(".site-header nav.menu"),this.menuItem=a()(".site-header nav.menu ul li a"),this.subMenu=a()(".site-header nav.menu ul li > ul"),this.isMobile=null,this.inRefDests=a()("[data-internal-ref]"),this.inRefs=this.menuItem,this.internalRefsOffset=e,this.createInternalRefsWaypoints(),this.events()}events(){this.menuIcon.click(this.toggleTheMenu.bind(this)),a()(window).on("load resize",function(){let e="absolute"!=this.subMenu.css("position"),t=e!=this.isMobile;this.isMobile=e,t&&(this.isMobile?(this.menuItem.on("click",this.handleTouches.bind(this)),this.menuItem.off("mouseenter"),this.subMenu.off("mouseleave")):(this.menuItem.off("click"),this.menuItem.on("mouseenter",this.handleMouseEnter.bind(this)),this.subMenu.on("mouseleave",this.handleMouseLeave.bind(this)))),a()("nav.menu ul li a[href^='#']").parent().off("click"),a()("nav.menu ul li a[href^='#']").parent().click(function(e){e.preventDefault(),new n(a()(e.target),1.5*-this.siteHeader.height(),900,"swing")}.bind(this))}.bind(this))}handleTouches(e){let t=a()(e.target).next("ul:first"),i=a()(e.target).find(".point");t.is(":not(:visible)")?(t.slideDown(),a()(i).removeClass("point-down").addClass("point-up")):t.is(":visible")&&(t.slideUp(),a()(i).removeClass("point-up").addClass("point-down"))}handleMouseEnter(e){let t=a()(e.target).next("ul:first"),i=a()(e.target).find(".point");t.is(":not(:visible)")&&(t.slideDown(),a()(i).removeClass("point-down").addClass("point-up")),clearTimeout(this.timer);var s=a()(e.target).closest("ul");s[0]&&clearTimeout(s[0].timer)}handleMouseLeave(e){e.currentTarget.timer=setTimeout(function(e){a()(e.currentTarget).slideUp();let t=a()(e.currentTarget).prev("a").find(".point");a()(t).removeClass("point-up").addClass("point-down")}.bind(this,e),1e3)}toggleTheMenu(){this.menuIcon.hasClass("header-nav-btn-close")?(this.menuContent.slideUp(),this.menuIcon.removeClass("header-nav-btn-close")):(this.menuContent.slideDown(),this.menuIcon.addClass("header-nav-btn-close")),a()(window).on("resize",function(){this.menuContent.css({display:""}),this.menuIcon.removeClass("header-nav-btn-close")}.bind(this))}createInternalRefsWaypoints(){var e=this;this.inRefDests.each(function(){var t=this;new Waypoint({element:t,handler:function(i){if("down"==i){if(!a()(window).scrollTop())return;var s=t.getAttribute("data-internal-ref");e.menuItem.removeClass("is-current-link"),a()(s).addClass("is-current-link")}},offset:e.internalRefsOffset}),new Waypoint({element:t,handler:function(i){if("up"==i){var s=t.getAttribute("data-internal-ref");e.menuItem.removeClass("is-current-link"),a()(s).addClass("is-current-link")}},offset:0})})}};window.jQuery=a.a;var l=class{constructor(){this.showSidebarButton=a()(".show-sidebar"),this.sidebar=a()(".sidebar"),this.hideSidebarButton=a()(".sidebar-hide"),this.main=a()(".main"),this.siteHeader=a()(".site-header"),this.events()}events(){this.showSidebarButton.click(this.showSidebar.bind(this)),this.hideSidebarButton.click(this.hideSidebar.bind(this)),a()(document).keyup(this.keypressHandler.bind(this))}keypressHandler(e){27==e.keyCode&&this.hideSidebar(e)}showSidebar(e){e.preventDefault(),this.sidebar.addClass("sidebar-is-visible"),this.main.addClass("main-squashed"),this.siteHeader.hasClass("site-header-fixed")&&this.siteHeader.addClass("site-header-fixed-squashed")}hideSidebar(e){e.preventDefault(),this.sidebar.removeClass("sidebar-is-visible"),this.main.removeClass("main-squashed"),this.siteHeader.removeClass("site-header-fixed-squashed")}};window.jQuery=a.a;var d=class{constructor(e,t,i){this.backToTopElem=a()(".back-to-top"),this.triggerElem=a()("[data-trigger-back-to-top=true]"),this.offsetPercentage=e,this.duration=t,this.timing_func=i,this.hideInitially(),this.createWaypoints(),this.events()}hideInitially(){this.backToTopElem.addClass("back-to-top-hidden")}createWaypoints(){var e=this;new Waypoint({element:e.triggerElem[0],handler:function(t){"down"==t?e.backToTopElem.removeClass("back-to-top-hidden"):e.backToTopElem.addClass("back-to-top-hidden")},offset:e.offsetPercentage})}events(){this.backToTopElem.click(function(e){e.preventDefault(),new n(this.backToTopElem.parent(),0,this.duration,this.timing_func)}.bind(this))}};window.jQuery=a.a;var h=class{constructor(){this.overlay=a()("div.disappear-on-load"),this.events()}hideOnLoad(){this.overlay.addClass("disappeared-on-load"),this.overlay.bind("transitionend",function(){this.overlay.hide(),this.overlay.trigger("onOverlayDisappear")}.bind(this))}events(){a()(window).on("load",this.hideOnLoad.bind(this))}};window.jQuery=a.a;var u=class{constructor(){this.container=a()("div.parallax-container"),this.img=a()("div.parallax-container").find(".parallax-img"),this.events()}events(){a()(document).scroll(function(){this.doParallaxScrolling()}.bind(this));var e=this;a()(window).on("load resize",function(){var t=e.container.length;e.container.each(function(i){let s=a()(this),r=s.find(".parallax-img");r.height()<=s.height()?r.css({top:"50%",transform:"translateY(-50%)"}):r.css({top:"",transform:""}),t==i+1&&e.doParallaxScrolling()})}.bind(e))}doParallaxScrolling(){this.container.each(function(){let e=a()(this).find(".parallax-img"),t=a()(this).attr("data-scroll-start-correction");t=isNaN(t)?0:t;let i=a()(window).scrollTop()-a()(this).offset().top+a()(window).height()-t,s=a()(this).attr("data-scroll-factor"),r=i*(s=isNaN(s)?e.height()/a()(window).height():s);i>0&&r<=e.height()-a()(this).height()&&e.css({top:-r})})}},c=i(1),p=i.n(c);window.jQuery=a.a;var f=class{constructor(){this.openModalButton=a()(".open-modal"),this.modal=a()(".modal"),this.modalContent=this.modal.find(".modal-content"),this.closeModalButton=a()(".modal-close"),this.events()}events(){var e=this;this.openModalButton.click(function(t){t.preventDefault();var i=a()(this).attr("data-open-modal-id");i?a()(i).addClass("modal-is-visible"):e.openModal(t).bind(e)}).bind(e),this.closeModalButton.click(this.closeModal.bind(this)),a()(document).keyup(this.keypressHandler.bind(this)),this.modal.on("click",function(e){a()(e.target).is(this.modalContent)||a()(this.modalContent).find(e.target).length||this.closeModal(e)}.bind(this))}keypressHandler(e){27==e.keyCode&&this.closeModal(e)}openModal(e){return e.preventDefault(),this.modal.addClass("modal-is-visible"),!1}closeModal(e){e.preventDefault(),this.modal.removeClass("modal-is-visible")}};i(9),i(8),i(7),i(6),i(5),i(4),i(3);window.jQuery=a.a,new r,new o("30%"),new l,new d("75%",900,"swing"),console.log("Javascript working.");var g=[{featureType:"poi.business",stylers:[{visibility:"off"}]}];a()(document).ready(function(){console.log("jQuery working."),a()("#lightSlider").lightSlider({item:4,auto:!0,loop:!0,responsive:[{breakpoint:768,settings:{item:3,slideMove:1,slideMargin:6}},{breakpoint:460,settings:{item:2,slideMove:1}}]}),a()("#lightGallery").lightSlider({gallery:!0,item:1,loop:!0,thumbItem:10,slideMargin:0,enableDrag:!1,currentPagerPosition:"left",onSliderLoad:function(e){e.lightGallery({selector:"#lightGallery .lslide"})}}),a()("#full-width-slideshow").owlCarousel({dots:!1,autoplay:!0,loop:!0,autoplayTimeout:3e3,autoHeight:!1,smartSpeed:1500,paginationSpeed:400,items:1,itemsDesktop:!1,itemsDesktopSmall:!1,itemsTablet:!1,itemsMobile:!1})}),new h,new u,new f,a()(window).on("load",function(){!function(){var e=new p.a({el:"#map",lat:35.51708,lng:24.017993,zoom:15,styles:g}),t=new google.maps.InfoWindow({content:"<h3>Test 1</h3><p>some address</p>"}),i=new google.maps.InfoWindow({content:"<h3>Test 2</h3><p>address blah blah</p>"});e.addMarker({title:"Test 1",lat:35.515446,lng:24.018132,click:function(i){t.open(e,this)}}),e.addMarker({title:"Test 2",lat:35.5128611,lng:24.0153056,click:function(t){i.open(e,this)}})}(),TweenMax.from(".logo",2,{y:-300,opacity:0,scale:1.5})})}});
//# sourceMappingURL=app.js.map