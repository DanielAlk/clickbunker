var navigation = {};

navigation.init = function() {
	var $container = $('#navigation');
	var $nav = $container.find('nav');
	var activate = function(element) { $nav.add(element).addClass('active'); };
	var deactivate = function(element) { $nav.add(element).removeClass('active'); };
	var switchOn = function(element) { 
		$container.fadeIn();
		$nav.show('slide', { direction: 'left' }, function() {
			activate(element)
		});
	};
	var switchOff = function(element) {
		$container.fadeOut();
		$nav.hide('slide', { direction: 'left' }, function() {
			deactivate(element)
		});
	};
	var toggle = function(e) {
		var element = this;
		if ($nav.hasClass('active')) switchOff(element);
		else switchOn(element);
	};
	$(document).on('click', '#navigation', function(e) {
		if ($(e.target).parents('nav').length || $(e.target).is('nav')) return;
		if ($nav.hasClass('active')) switchOff($('.menu-toggle'));
	});
	$('.menu-toggle').click(toggle);

	this.off = function() {
		switchOff($('.menu-toggle'));
	};
};

var scrollTo = function() {
	var $body = $('body, html');
	var headerHeight = document.getElementsByTagName('header').item(0).offsetHeight;
	$('.scroll-to').click(function(e) {
		e.preventDefault();
		var $target = $(this).attr('href')[0] == '#' ? $($(this).attr('href')) : false;
		var top = $target ? $target.offset().top : headerHeight;
		var delay = $(this).data('delay') || 600;
		$body.stop(true, true);
		$body.animate({ scrollTop: top - headerHeight }, delay);
		navigation.off();
	});
};