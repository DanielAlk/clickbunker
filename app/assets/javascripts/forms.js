var Forms = {};

Forms.contact = function() {
  $('.dropdown-container').drop();
	var output = function(html) {
		$('#contactModal .modal-body p').remove();
		$('<p>', { html: html })
		.css('margin-top', 20)
		.appendTo($('#contactModal .modal-body'));
	};
	$('#contactForm').validate(function(e) {
	  e.preventDefault();
	  var form = e.target;
	  $(form).remove();
	  output('Estamos procesando su solicitud...');
	  $.post(form.action, $(form).serialize(), function(data) {
	    if (data) output('Gracias por contactarte<br>Nos pondremos en contacto a la brevedad');
	    else console.log(arguments);
	  }, 'json');
	});
};