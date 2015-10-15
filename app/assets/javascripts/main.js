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
	var headerHeight;
	$('.scroll-to').click(function(e) {
		e.preventDefault();
		var $target = $(this).attr('href')[0] == '#' ? $($(this).attr('href')) : false;
		var top = $target ? $target.offset().top : headerHeight;
		var delay = $(this).data('delay') || 600;
		$body.stop(true, true);
		$body.animate({ scrollTop: top - headerHeight }, delay);
		navigation.off();
	});
	$(window).load(function() {
		headerHeight = document.getElementsByTagName('header').item(0).offsetHeight;
	});
};

var permanentArrow = function() {
	var $arrow = $('.permanent-arrow a');
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
	};
	var handler = function(e) {
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
		$body.animate({ scrollTop: top }, scroll == 0 ? 1200 : 600);
		if (top == tops[tops.length-1]) $arrow.parent().addClass('inverted');
	};
	$arrow.click(handler);
	$(window).load(setTops);
	MEDIA.addListener(setTops, $arrow.get(0));
};

$(function() {
	$.fn.drop = function() {
		this.each(function() {
			var $drop = $(this);
			var $hidden = $drop.children('[type=hidden]');
			var $input = $drop.children('[type=text]');
			var $trigger = $drop.children('a');
			var $list = $drop.children('ul');
			var $options = $list.find('a');
			var documentClick = function(e) {
				if (!$(e.target).is($trigger) && !$(e.target).is($options)) close();
			};
			var open = function() {
				$drop.addClass('active');
				$list.stop(true,true).fadeIn();
				$(document).on('click', documentClick);
			};
			var close = function() {
				$drop.removeClass('active');
				$list.stop(true,true).fadeOut();
				$(document).off('click', documentClick);
			};
			var toggle = function(e) {
				e.preventDefault();
				if ($drop.hasClass('active')) close();
				else open();
			};
			var saveAndClose = function(e) {
				e.preventDefault();
				var $option = $(this);
				var value = $option.data('value');
				var text = $option.text();
				$options.removeClass('active');
				$option.addClass('active');
				$input.val(text);
				$hidden.val(value);
				close();
			};
			$trigger.click(toggle);
			$options.click(saveAndClose);
		});
	};

	$.fn.validate = function(onSuccess) {
		var obj = typeof onSuccess == 'object' ? onSuccess : {};
		onSuccess = typeof onSuccess == 'function' ? onSuccess : (function() {
			if ((typeof onSuccess == 'object') && (onSuccess.onSuccess)) {
				return onSuccess.onSuccess;
			} else {
				return function(){};
			}
		}());
		this.each(function() {
			var $form = $(this);
			var init = function() {
				$form[0].reset();
				$form.prop('novalidate', true);
				$form.on('keyup change keydown', 'input,textarea,select', function(e) {
					var $this = $(this);
					var $group = $this.parent('.form-group');
					if (validate($this)) {
						$group.removeClass('has-error');
						$group.addClass('has-success');
					}
					else {
						$group.addClass('has-error');
						$group.removeClass('has-success');
					}
				});
				var tpShown = function(e) {
					var $this = $(this);
					$this.off('shown.bs.tooltip');
					setTimeout(function() {
						$this.tooltip('hide');
						$this.on('shown.bs.tooltip', tpShown);
					},1000);
				};
				$form.find('input,textarea,select').each(function(i) {
					var $this = $(this);
					var data = $this.data();
					data.maxLength = typeof $this.attr('maxlength') != 'undefined' ? $this.attr('maxlength') : false;
					$this.tooltip({
						title: $this.data().invalid,
						placement: 'top',
						trigger: 'manual',
					});
					$this.on('shown.bs.tooltip', tpShown);
				});
				$form.submit(function(e) {
					if (validated()) {
						onSuccess(e);
					}
					else {
						e.preventDefault();
					}
				});
			};
			var validate = function($this) {
				var type = typeof $this.attr('type') == 'undefined' ? $this[0].tagName.toLowerCase() : $this.attr('type');
				var val = $this.val();
				if ((!$this.prop('required')) && ($this.val() == '')) return true;
				switch (type) {
					case 'email':
						var noEmail = val.replace(/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/,'');
						if ((noEmail) || (!$this.val())) {
							return false;
						};
					break;
					case 'select':
						if (!val) return false;
					break;
					case 'number': case 'tel': 
						if (type == 'number') { 
							if (val.search(/[^0-9]/) > -1) return false;
						}
						else if (type == 'tel') {
							if (val.search(/[^\s\d\(\)\-\+]/) > -1) return false;
						}
					default:
						var data = $this.data();
						var maxLength = data.maxLength ? Number(data.maxLength) : $this.val().length+1;
						var minLength = data.minLength ? Number(data.minLength) : $this.val().length-1;
						if ((!val) || (val.length > maxLength) || (val.length < minLength)) {
							return false;
						}
				}
				for (var key in obj) {
					if ((key == $this.attr('id')) && (typeof obj[key] == 'function')) return obj[key]($this);
				}
				return true;
			};
			var validated = function() {
				var rtn = (function() {
					var $elem = $form.find('input,textarea,select');
					var $this;
					for (var i=0; i<$elem.length; i++) {
						$this = $($elem[i]);
						if (!validate($this)) {
							onFalse($this);
							return false;
						}
					}
				}());
				return typeof rtn == 'undefined' ? true : false;
			};
			var onFalse = function($this) {
				$this.focus();
				$this.tooltip('show');
			};
			init();
		});
	};
});