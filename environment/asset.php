<?php
class Asset {
	public function __construct() {
		global $base_url;
		$assets = array();
		$settings = parse_ini_file(__DIR__.'/../config/assets.ini', true);
		$this->force_types = $settings['force_types'];
		unset($settings['force_types']);
		foreach ($settings as $ext => $dirs) {
			$keys = array_keys($dirs);
			$real = get_include_path().'assets/'.$keys[0].'/';
			$rewriten = $base_url.$dirs[$keys[0]].'/';
			if(!strpos($ext, ',')) $assets[$ext] = array($real, $rewriten);
			else {
				$exts = explode(',', $ext);
				foreach ($exts as $e) $assets[$e] = array($real, $rewriten);
			}
		}
		$this->assets = $assets;
	}
	
	public function path($str, $type = null) {
		$arr = explode('.', $str);
		$ext = $type ? $this->force_types[$type] : end($arr);
		print $this->assets[$ext][1].$str;
	}
	
	public function get_folder($dir, $type = 'jpg', $filter = '', $return_data = null) {
		$rtn = array();
		$path = $this->assets[$type][0].$dir.'/'.$filter.'*.'.$type;
		foreach(glob($path) as $filename) {
			$file_info = $this->assets[$type][1].str_replace($this->assets[$type][0], '', $filename);
			$image_data = getimagesize($filename);
			if ($return_data) $rtn[] = array( 'file' => $file_info, 'data' => $image_data );
			else $rtn[] = $file_info;
		}
		return $rtn;
	}
	
	public function __call($ext, $args = array()) {
		$filename = isset($args[0]) ? $args[0] : 'main';
		print $this->assets[$ext][1].$filename.".$ext";
	}

	private $assets = array();

	private $force_types = array();
}
?>