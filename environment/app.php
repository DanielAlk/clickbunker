<?php
class App {
	public function __construct() {
		global $params;
		set_include_path('../app/views/');
		$this->settings = parse_ini_file('../config/app.ini', true);
		$this->controller = $params['controller'].'_controller';
		$this->action = $params['action'];
		$this->layout = 'layouts/main.php';
		$this->views_directory = str_replace('_controller', '', $this->controller);
		$this->view = $this->views_directory.'/'.$this->action.'.php';
		$log = array('controller'=>$this->controller,'action'=>$this->action,'POST'=>$_POST,'GET'=>$_GET);
		//SET LOG IN TESTING OR DEVELOPMENT ENVIRONMENTS
		if ($GLOBALS['debug']) $GLOBALS['log'] = json_encode($log);
		//SET METHODS
		$this->set_methods();
		//CHECK IF ACTION EXISTS AND RUN
		if (!method_exists($this, $this->action)) $this->not_found();
		else $this->$params['action']($this->before_action_method());
	}

	private function set_methods() {
		function render($file, $echos = array()) {
			foreach($GLOBALS as $key => $value) { $$key = $value; }
			foreach ($echos as $key => $value) { $$key = $value; }
			include $file;
		}
		function __($var_name) {
			if (isset($GLOBALS[$var_name])) echo $GLOBALS[$var_name];
		}
	}

	public function buffer() {
		$ob_status = ob_get_status();
		if ($ob_status['type']) ob_end_flush();
	}

	private function before_action_method() {
		if (!isset($this->before_actions) || !is_array($this->before_actions)) return null;
		$return = new stdClass;
		$is_empty = true;
		foreach($this->before_actions as $before_action) {
			if (is_array($before_action[0]) && in_array($this->action, $before_action[0])) {
				$method_name = $before_action[1];
				$return->$method_name = $this->$method_name();
				$is_empty = false;
			}
			else if (is_string($before_action[0])) {
				$method_name = $before_action[0];
				$return->$method_name = $this->$method_name();
				$is_empty = false;
			}
		}
		return $is_empty ? null : $return;
	}

	# TODO: this function should also execute the method asociated with the view in the controller
	protected function render($view_name) {
		$this->view = $this->views_directory.'/'.$view_name.'.php';
	}

	protected function not_found() {
		header("HTTP/1.0 404 Not Found");
		$this->layout = 'layouts/not_found.php';
		return false;
	}
}

/* BEFORE_ACTION_METHOD
 *
 * Define a $before_actions array in your controller with one array for each method to execute
 * each array can have up to two items: 
 * the first can be an array of actions to intersept, and the second, a string with a method to execute
 * if the array has one item, it must be a method name, that it'll be executed before every action
 * if any value is returned it will go in an object as an action parameter
 * the returned object will have one property for each method executed (the name of the property is the name of the method)
 * Example: 
 * $before_actions = array(
 * 	array(array('action1', 'action2'), 'method_to_execute_before_those_actions'),
 * 	array('method_before_action3')
 * );
 */
?>