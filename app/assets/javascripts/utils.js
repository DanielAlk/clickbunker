var Utils = {};

Utils.permanentArrow = function() {
	var $arrow = $('#permanent-arrow a');
	var $body = $('body, html');
	var $sections = $('section,footer');
	var headerHeight;
	var tops;
	var setTops = function() {
		tops = [];
		headerHeight = document.getElementsByTagName('header').item(0).offsetHeight;
		$sections.each(function() {
			tops.push($(this).offset().top - headerHeight);
		});
		tops.push($body.height() - $(window).height());
	};
	var handler = function(e) {
		e.preventDefault();
		var top;
		if ($arrow.parent().hasClass('inverted')) {
			top = 0;
			$arrow.parent().removeClass('inverted');
		} else {
			var scroll = Math.max($('body').scrollTop(), $('html').scrollTop());
			tops.forEach(function(t) {
				if (!top && scroll < t) top = t;
			});
		};
		$body.stop(true, true);
		$body.animate({ scrollTop: top }, scroll < tops[0] ? 1200 : 600);
		if (top >= tops[tops.length-1]) $arrow.parent().addClass('inverted');
	};
	$arrow.click(handler);
	$(window).load(setTops);
	MEDIA.addListener(setTops, $arrow.get(0));
};