<?php
$extra_js .=<<< EXTRA_JS
Navigation.init();
EXTRA_JS;
?>
<header>
	<div class="relative">
		<div class="absolute block top left text-center">
			<a class="<?php logo_class(); ?>" href="<?php echo $path->home(); ?>"><img class="clickbunker" alt="ClickBunker" src="<?php $asset->path('clickbunker.png'); ?>"></a>
		</div>
		<div class="pull-left">
			<button type="button" class="navbar-toggle menu-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="text">MENU</span>
      </button>
		</div>
		<div class="pull-right">
			<a href="#contactModal" class="btn btn-primary" data-toggle="modal" data-target="#contactModal">Contacto</a>
		</div>
	</div>
</header>
<div class="nav-container" id="navigation">
	<div class="relative">
		<nav class="absolute">
			<div class="navigation">
				<?php render('shared/_nav_links.php', array('class' => 'organize-y-15')); ?>
				<div class="visible-xs inspace-N-20">
					<a href="#contactModal" class="btn btn-primary" data-toggle="modal" data-target="#contactModal" style="color:#FFF; font-size:15px;">Contacto</a>
				</div>
				<?php render('shared/_social_links.php', array('class' => 'organize-x-10 space-N-30')); ?>
			</div>
		</nav>
	</div>
</div>
<?php include 'shared/_contact_modal.php'; ?>