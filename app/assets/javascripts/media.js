MEDIA = {
	is_active: false,
	queries: {
		xs: window.matchMedia('(max-width: 767px)'),
		sm: window.matchMedia('(max-width: 991px)'),
		md: window.matchMedia('(max-width: 1199px)')
	},
	listener: function(e, mq) {
		var data = e.data;
		if (data.el.offsetParent !== null) return data.callback(e, mq);
	},
	addListener: function(handler, element) {
		$(document).on('match.media', { el: element, callback: handler }, this.listener);
		return this.init();
	},
	init: function() {
		if (this.is_active) return this;
		for (var k in this.queries) {
			this.queries[k].addListener(function() {
				$(document).trigger('match.media', this);
			});
		}
		this.is_active = true;
		return this;
	}
};