<?php
class mailer_controller extends ApplicationController {
	protected $before_actions = array(
		array('choose_layout')
		);

	protected function contact() {
		if (!isset($_POST['contact'])) return $this->not_found();
		global $mailer, $path;
		$GLOBALS['contact'] = $_POST['contact'];
		$mailer->notify('Contacto Clickbunker');
	}

	protected function choose_layout() {
		$this->layout = 'layouts/clean.php';
	}

}
?>