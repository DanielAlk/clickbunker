var BunkerAnimation = {}
BunkerAnimation.controller = new ScrollMagic.Controller();
BunkerAnimation.calculateTop = function(val) {
	return BunkerAnimation.duration * val;
};
BunkerAnimation.setScene = function() {
	if (!$('#parallaxBunker').length) return;
	BunkerAnimation.duration = $('#parallaxBunker').outerHeight();
	var controller = BunkerAnimation.controller;
	var calculateTop = BunkerAnimation.calculateTop;
	var tween = new TimelineMax ()
	.add([
		//TweenMax.to("#parallaxBunker .bunker-layer-0", 1, {top: calculateTop(1.01), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-0", 1, {top: calculateTop(0.68), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-1", 1, {top: calculateTop(0.93), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-2", 1, {top: calculateTop(0.715), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-3", 1, {top: calculateTop(0.64), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-4", 1, {top: calculateTop(0.5), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-5", 1, {top: calculateTop(0.43), ease: Linear.easeNone}),
	]);
	BunkerAnimation.scene = new ScrollMagic.Scene({duration: BunkerAnimation.duration})
	.setTween(tween)
	.addTo(controller);
};