var controller = new ScrollMagic.Controller();
$(function () { 
	var tween = new TimelineMax ()
	.add([
		TweenMax.to("#parallaxBunker .bunker-layer-1", 1, {bottom: 180, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-2", 1, {top: -50, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-3", 1, {bottom: 120, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-4", 1, {bottom: 100, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-5", 1, {bottom: 140, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-6", 1, {bottom: 160, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-7", 1, {bottom: 180, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-8", 1, {bottom: 240, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-9", 1, {bottom: 400, ease: Linear.easeNone}),
		TweenMax.to("#parallaxBunker .bunker-layer-10", 1, {bottom: 400, ease: Linear.easeNone})
	]);

	var scene = new ScrollMagic.Scene({triggerElement: "#parallaxBunker", duration: 100, offset: 350})
	.setTween(tween)
	//.setPin("#parallaxBunker")
	.addTo(controller);
});