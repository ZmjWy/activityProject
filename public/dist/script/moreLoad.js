!function($){"use strict";function o(o){o.touches||(o.touches=o.originalEvent.touches)}function t(o,t){t._startY=o.touches[0].pageY,t.touchScrollTop=t.$scrollArea.scrollTop()}function n(o,t){t._curY=o.touches[0].pageY,t._moveY=t._curY-t._startY,t._moveY>0?t.direction="down":t._moveY<0&&(t.direction="up");var n=Math.abs(t._moveY);""!=t.opts.loadUpFn&&t.touchScrollTop<=0&&"down"==t.direction&&!t.isLockUp&&(o.preventDefault(),t.$domUp=$("."+t.opts.domUp.domClass),t.upInsertDOM||(t.$element.prepend('<div class="'+t.opts.domUp.domClass+'"></div>'),t.upInsertDOM=!0),l(t.$domUp,0),n<=t.opts.distance?(t._offsetY=n,t.$domUp.html(t.opts.domUp.domRefresh)):n>t.opts.distance&&n<=2*t.opts.distance?(t._offsetY=t.opts.distance+.5*(n-t.opts.distance),t.$domUp.html(t.opts.domUp.domUpdate)):t._offsetY=t.opts.distance+.5*t.opts.distance+.2*(n-2*t.opts.distance),t.$domUp.css({height:t._offsetY}))}function s(o){var t=Math.abs(o._moveY);""!=o.opts.loadUpFn&&o.touchScrollTop<=0&&"down"==o.direction&&!o.isLockUp&&(l(o.$domUp,300),t>o.opts.distance?(o.$domUp.css({height:o.$domUp.children().height()}),o.$domUp.html(o.opts.domUp.domLoad),o.loading=!0,o.opts.loadUpFn(o)):o.$domUp.css({height:"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){o.upInsertDOM=!1,$(this).remove()}),o._moveY=0)}function e(o){""!=o.opts.loadDownFn&&o.opts.autoLoad&&o._scrollContentHeight-o._threshold<=o._scrollWindowHeight&&i(o)}function d(o){o.opts.scrollArea==a?o._scrollContentHeight=p.height():o._scrollContentHeight=o.$element[0].scrollHeight}function i(o){o.direction="up",o.$domDown.html(o.opts.domDown.domLoad),o.loading=!0,o.opts.loadDownFn(o)}function l(o,t){o.css({"-webkit-transition":"all "+t+"ms",transition:"all "+t+"ms"})}var a=window,r=document,c=$(a),p=$(r);$.fn.dropload=function(o){return new h(this,o)};var h=function(o,t){var n=this;n.$element=o,n.upInsertDOM=!1,n.loading=!1,n.isLockUp=!1,n.isLockDown=!1,n.isData=!0,n._scrollTop=0,n._threshold=0,n.init(t)};h.prototype.init=function(d){var l=this;l.opts=$.extend(!0,{},{scrollArea:l.$element,domUp:{domClass:"dropload-up",domRefresh:'<div class="dropload-refresh">↓下拉刷新</div>',domUpdate:'<div class="dropload-update">↑释放更新</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>'},domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">↑上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">暂无数据</div>'},autoLoad:!0,distance:50,threshold:"",loadUpFn:"",loadDownFn:"",scrollRange:""},d),""!=l.opts.loadDownFn&&(l.$element.append('<div class="'+l.opts.domDown.domClass+'">'+l.opts.domDown.domRefresh+"</div>"),l.$domDown=$("."+l.opts.domDown.domClass)),l.$domDown&&""===l.opts.threshold?l._threshold=Math.floor(1*l.$domDown.height()/3):l._threshold=l.opts.threshold,l.opts.scrollArea==a?(l.$scrollArea=c,l._scrollContentHeight=$("body").height(),l._scrollWindowHeight=r.documentElement.clientHeight):(l.$scrollArea=l.opts.scrollArea,l._scrollContentHeight=l.$element[0].scrollHeight,l._scrollWindowHeight=l.$element.height()),e(l),c.on("resize",function(){clearTimeout(l.timer),l.timer=setTimeout(function(){l.opts.scrollArea==a?l._scrollWindowHeight=a.innerHeight:l._scrollWindowHeight=l.$element.height(),e(l)},150)}),l.$element.on("touchstart",function(n){l.loading||(o(n),t(n,l))}),l.$element.on("touchmove",function(t){l.loading||(o(t,l),n(t,l))}),l.$element.on("touchend",function(){l.loading||s(l)}),l.$scrollArea.on("scroll",function(){l._scrollTop=l.$scrollArea.scrollTop(),l._scrollContentHeight=$("body").height(),l.opts.scrollRange(l._scrollTop),""!=l.opts.loadDownFn&&!l.loading&&!l.isLockDown&&l._scrollContentHeight-l._threshold<=l._scrollWindowHeight+l._scrollTop&&i(l)})},h.prototype.lock=function(o){var t=this;void 0===o?"up"==t.direction?t.isLockDown=!0:"down"==t.direction?t.isLockUp=!0:(t.isLockUp=!0,t.isLockDown=!0):"up"==o?t.isLockUp=!0:"down"==o&&(t.isLockDown=!0,t.direction="up")},h.prototype.unlock=function(){var o=this;o.isLockUp=!1,o.isLockDown=!1,o.direction="up"},h.prototype.noData=function(o){var t=this;console.log(o),void 0===o||1==o?t.isData=!1:0==o&&(t.isData=!0)},h.prototype.resetload=function(){var o=this;"down"==o.direction&&o.upInsertDOM?(o.$domUp.css({height:"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){o.loading=!1,o.upInsertDOM=!1,$(this).remove(),d(o)}),o.isData?o.$domDown.html(o.opts.domDown.domRefresh):o.$domDown.html(o.opts.domDown.domNoData)):"up"==o.direction&&(o.loading=!1,o.isData?(o.$domDown.html(o.opts.domDown.domRefresh),d(o),e(o)):o.$domDown.html(o.opts.domDown.domNoData))}}(window.Zepto||window.jQuery);