var controller = new ScrollMagic.Controller();
$(function () { 
	var tween = new TimelineMax ()
	.add([
		TweenMax.to("#parallaxBunker .bunker-layer-0", 1, {top: 475, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-1", 1, {top: 650, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-2", 1, {top: 500, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-3", 1, {top: 450, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-4", 1, {top: 350, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-5", 1, {top: 300, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-6", 1, {top: 0, ease: Linear.easeNone})
	]);

	var scene = new ScrollMagic.Scene({duration: 700})
	.setTween(tween)
	.addTo(controller);
});