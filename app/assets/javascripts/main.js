var BunkerAnimation = {}
BunkerAnimation.controller = new ScrollMagic.Controller();
BunkerAnimation.calculateTop = function(val) {
	return BunkerAnimation.duration * val;
};
BunkerAnimation.setScene = function(duration) {
	BunkerAnimation.duration = duration;
	var controller = BunkerAnimation.controller;
	var calculateTop = BunkerAnimation.calculateTop;
	var tween = new TimelineMax ()
	.add([
		TweenMax.to("#parallaxBunker .bunker-layer-0", 1, {top: calculateTop(0.68), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-1", 1, {top: calculateTop(0.93), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-2", 1, {top: calculateTop(0.715), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-3", 1, {top: calculateTop(0.64), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-4", 1, {top: calculateTop(0.5), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-5", 1, {top: calculateTop(0.43), ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-6", 1, {top: calculateTop(0), ease: Linear.easeNone})
	]);
	BunkerAnimation.scene = new ScrollMagic.Scene({duration: duration})
	.setTween(tween)
	.addTo(controller);
};

$(function() { 
	BunkerAnimation.setScene($('#parallaxBunker').outerHeight());
});