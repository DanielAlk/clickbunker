<?php
# You can create as many helpers as you want, all of them will be initiated everytime.
# Helpers wont be available like an object such as: $some_helper->method.
# instead its just initiated, so you must define methods inside the __contruct function.
class application_helper {
	
	public function __construct() {

		$GLOBALS['extra_js'] = '';
	
		function logo_class() {
			global $params;
			if ($params['controller'] == 'home' and $params['action'] == 'index') echo 'scroll-to';
		}

		function dropdown($name, $id, $placeholder, $opts, $required = true) {
			global $asset;
			$options = array();
			foreach ($opts as $key => $value) {
				if (is_int($key)) $options[$value] = $value;
				else $options[$key] = $value;
			}
			include 'shared/_dropdown.php';
		}
	
	}
	
}
?>