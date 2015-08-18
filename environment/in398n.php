<?php
class in398n {
	public function __construct() {
		$parsed_ini = parse_ini_file('../config/app.ini', true);
		$this->config = $parsed_ini['locale'];
		$param = $this->config['param'];
		$default = $this->config['default'];

		$this->language = isset($_GET[$param]) && file_exists('../config/locales/'.$_GET[$param].'.ini') ? $_GET[$param] : $default;

		$this->l = parse_ini_file('../config/locales/'.$this->language.'.ini', true);

		function _l($str) {
			global $locale;
			$keys = explode('.', $str);
			foreach ($keys as $i => $k) {
				if (!$i) $r = isset($locale->l[$k]) ? $locale->l[$k] : false;
				else $r = isset($r[$k]) ? $r[$k] : false;
			}
			if (preg_match_all('/\{\{([\w\d\.]+)\}\}/', $r, $matches)) {
				foreach ($matches[1] as $str) {
					$r = str_replace('{{'.$str.'}}', _l($str), $r);
				}
			}
			return $r;
		};

		function l($str) {
			echo _l($str);
		};

		function change_locale($lng) {
			global $locale;
			$current = preg_replace('/[\?&]?'.$locale->config['param'].'=\w+/', '', $_SERVER['REQUEST_URI']);
			if ($lng == $locale->config['default']) echo $current;
			elseif (strpos($current, '?') !== false) echo $current.'&'.$locale->config['param'].'='.$lng;
			else echo $current.'?'.$locale->config['param'].'='.$lng;
		}
	}
}
?>