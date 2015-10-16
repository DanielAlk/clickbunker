<div class="dropdown-container">
  <input type="hidden" name="<?php echo $name; ?>" id="<?php echo $id; ?>">
  <input type="text" class="form-control" placeholder="<?php echo $placeholder; ?>" <?php if ($required) echo 'title="Este campo es requerido" required'; ?>>
  <div class="trigger"><img src="<?php $asset->path('dropdown-caret.png') ?>"></div>
  <ul class="list-unstyled">
  	<?php foreach ($options as $value => $text): ?>
	  	<li><a href="#" data-value="<?php echo $value; ?>"><?php echo $text; ?></a></li>
	  <?php endforeach; ?>
  </ul>
</div>