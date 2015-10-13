<?php
class ApplicationController extends App {

	protected function detect_mobile() {
		global $Mobile_Detect;
		if ($Mobile_Detect->isTablet()) $GLOBALS['device'] = 'tablet';
		else if ($Mobile_Detect->isMobile()) $GLOBALS['device'] = 'mobile';
		else $GLOBALS['device'] = 'desktop';
	}

}
?>