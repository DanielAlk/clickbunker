$(function() {
	$.fn.drop = Extensions.drop;
	$.fn.validate = Extensions.validate;
});

var Extensions = {};

Extensions.drop = function() {
	this.each(function() {
		var $drop = $(this);
		var $hidden = $drop.children('[type=hidden]');
		var $input = $drop.children('[type=text]');
		var $trigger = $drop.children('div.trigger');
		var $list = $drop.children('ul');
		var $options = $list.find('a');
		var $form = $drop.parents('form');
		var is_open = function() {
			return $list.css('display') == 'block';
		};
		var documentClick = function(e) {
			if (!$(e.target).is($trigger.add($trigger.children()).add($options).add($input))) close();
		};
		var documentKeyup = function(e) {
			e.preventDefault();
			var $active = $options.filter('.active, .selected');
			var $next;
			switch(e.which) {
				case 40: $next = $active.length && !$active.is($options.last()) ? $active.parents('li').next().find('a') : $options.first(); break;
				case 38: $next = $active.length && !$active.is($options.first()) ? $active.parents('li').prev().find('a') : $options.last(); break;
				default: return;
			};
			$options.removeClass('active selected');
			$next.addClass('active');
		};
		var inputKeydown = function(e) {
			if (!is_open() && (e.which == 40 || e.which == 38)) open();
			else if (e.which != 13) e.preventDefault();
		};
		var open = function() {
			$drop.addClass('active');
			$list.stop(true,true).fadeIn();
			$(document).on('click', documentClick);
			$(document).on('keyup', documentKeyup);
		};
		var close = function() {
			$drop.removeClass('active');
			$list.stop(true,true).fadeOut();
			$(document).off('click', documentClick);
			$(document).off('keyup', documentKeyup);
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
			$options.removeClass('active selected');
			$option.addClass('selected');
			$input.val(text);
			$hidden.val(value);
			close();
		};
		var submit = function(e) {
			if (!is_open()) return;
			$options.filter('.active').click();
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		};
		$trigger.add($input).click(toggle);
		$options.click(saveAndClose);
		$input.keydown(inputKeydown);
		$form.submit(submit);
	});
};

Extensions.validate = function(onSuccess) {
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