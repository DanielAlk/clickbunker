<?php
class home_controller extends ApplicationController {
	protected $before_actions = array(
		array('detect_mobile')
		);

	protected function index() {
	}

}
?>