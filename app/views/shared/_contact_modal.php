<?php
$extra_js .=<<< EXTRA_JS
Forms.contact();
EXTRA_JS
?>
<div class="modal fade" id="contactModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <div class="modal-body">
        <img class="clickbunker" alt="Clickbunker" src="<?php $asset->path('clickbunker-black.png'); ?>">
        <form class="space-N-40" action="<?php echo $path->mailer_contact(); ?>" method="POST" role="form" id="contactForm" novalidate>
          <div class="form-group">
            <label class="sr-only" for="contact_name">Nombre</label>
            <input class="form-control" type="text" name="contact[name]" id="contact_name" placeholder="Nombre" title="Este campo es requerido" required>
          </div>
          <div class="form-group">
            <label class="sr-only" for="contact_email">Email</label>
            <input class="form-control" type="email" name="contact[email]" id="contact_email" placeholder="Email" title="Ingresá un email válido" required>
          </div>
          <div class="form-group">
            <label class="sr-only" for="contact_phone">Teléfono de contacto</label>
            <input class="form-control" type="tel" name="contact[tel]" id="contact_phone" placeholder="Teléfono de contacto" title="Ingresá un teléfono válido" required>
          </div>
          <div class="form-group">
            <div class="dropdown-container">
              <input type="hidden" name="contact[how]" id="contact_how">
              <input type="text" class="form-control" placeholder="¿Cómo nos conoció?" title="Este campo es requerido" required>
              <a href="#"><img src="<?php $asset->path('dropdown-caret.png') ?>"></a>
              <ul class="list-unstyled">
                <li><a href="#" data-value="Google">Google</a></li>
                <li><a href="#" data-value="Redes Sociales">Redes Sociales</a></li>
                <li><a href="#" data-value="Evento">Evento</a></li>
                <li><a href="#" data-value="Recomendación">Recomendación</a></li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <label class="sr-only" for="contact_message">Mensaje</label>
            <textarea class="form-control" id="contact_message" rows="4" name="contact[message]" placeholder="Mensaje" title="Este campo es requerido" required></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">ENVIAR</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>