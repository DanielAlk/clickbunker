<?php if ($device != 'mobile'): ?>
	<div class="parallax-bunker" id="parallaxBunker">
		<div class="bunker">
			<div class="bunker-layer-0"></div>
			<div class="bunker-layer-1"></div>
			<div class="bunker-layer-2"></div>
			<div class="bunker-layer-3"></div>
			<div class="bunker-layer-4"></div>
			<div class="bunker-layer-5">
				<div class="container">
					<?php include 'home/_bunker_content.php'; ?>
				</div>
			</div>
			<div class="bunker-layer-6"></div>
		</div>
	</div>
<?php else: ?>
	<div class="parallax-bunker">
		<div class="bunker">
			<div class="bunker-background">
				<div class="container">
					<?php include 'home/_bunker_content.php'; ?>
				</div>
			</div>
		</div>
	</div>
<?php endif; ?>