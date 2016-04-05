$(function() {

  var controller = new ScrollMagic.Controller();

  TweenMax.set('#map', {opacity:0.1});
  var mapScene = new TimelineMax()
              .add([
                TweenMax.to("#map", 200, {top: "125px", ease: Linear.easeNone}),
                TweenMax.to(".map-section", 110, {opacity: "1", ease: Linear.easeNone}),
    						TweenMax.to("#show-info", 420, {delay:"30", top: "-300", ease: Power2.easeOut}),
    						TweenMax.to(".direction-btn", 30, {delay:"80", bottom: "-=3.2em", ease: Power2.easeOut}),
              ]);

  var scene = new ScrollMagic.Scene({
    triggerElement: '#map',
    offset: 0,
    duration: 1000,
    triggerHook: 0.7
  })
  .setTween(mapScene)
  .addTo(controller);
   // scene.addIndicators({name: "mapScene Test"});


});
