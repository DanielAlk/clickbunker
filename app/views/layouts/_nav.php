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
			<a href="#contact" class="btn btn-primary">Contacto</a>
		</div>
	</div>
</header>
<div class="nav-container" id="navigation">
	<div class="relative">
		<nav class="absolute">
			<div class="navigation">
				<?php render('layouts/_nav_links.php', array('class' => 'organize-y-15')); ?>
				<div class="visible-xs inspace-N-20">
					<a href="#contact" class="btn btn-primary" style="color:#FFF; font-size:15px;">Contacto</a>
				</div>
				<?php render('layouts/_social_links.php', array('class' => 'organize-x-10 space-N-30')); ?>
			</div>
		</nav>
	</div>
</div>