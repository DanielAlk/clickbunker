<?php
class home_controller extends ApplicationController {
	protected $before_actions = array(
		array(array('index'), 'detect_mobile')
		);

	protected function index() {
	}

}
?>