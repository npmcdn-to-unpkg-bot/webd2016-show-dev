"use strict";

(function(){

$(window).scroll(function() {
	if ($( window ).width() > 1050) {
	    var x = $(this).scrollTop();
	    //console.log('50% ' + parseInt(-x / 6 + 100) + 'px' + ', 50% ' + parseInt(x / 2) + 'px');
	    $('#about').css('background-position', '50% ' + parseInt(-x / 1.5 + 375 ) + 'px' + ', 50% ' + parseInt(x / 2) + 'px, center center');
    }
});
	// Set up firebase url and variables
	var index,avatar;
	var url = new Firebase('https://humberinfluxdb.firebaseio.com');

	function getProfile(getIndex){
		$('#social-profiles').empty();
		url.child('students').once('value', function(snapshot) {		    
		    var name = snapshot.val()[getIndex].name;
		    var bio = snapshot.val()[getIndex].bio;
		    var website = snapshot.val()[getIndex].website;
		    var nextName = snapshot.val()[getIndex+1].name;
		    var previousName = snapshot.val()[getIndex-1].name;
		    var twitter = snapshot.val()[getIndex].social[0].twitter;
		    var facebook = snapshot.val()[getIndex].social[0].facebook;
		    var instagram = snapshot.val()[getIndex].social[0].instagram;
		    var behance = snapshot.val()[getIndex].social[0].behance;

			   
		   if (getSocialLink(twitter) == true){
		   	$('#social-profiles').append('<li><a href="#"><i class="fa fa-twitter"></i></a></li>');
		   } 
		   if (getSocialLink(facebook) == true){
		   $('#social-profiles').append('<li><a href="#"><i class="fa fa-facebook"></i></a></li>');
		   } 
		   if (getSocialLink(instagram) == true){
		   	$('#social-profiles').append('<li><a href="#"><i class="fa fa-instagram"></i></a></li>');
		   } 
		   if (getSocialLink(behance) == true){
		   	$('#social-profiles').append('<li><a href="#"><i class="fa fa-behance"></i></a></li>');
		   } 
		    
		    console.log(" name: "+ name + ", bio: " + bio + ", website: " + website);

		    $('.modal header h3').text(name);
		    $('.next-profile span').text(nextName);
		    $('.last-profile span').text(previousName);
		    $('.bio .website').text(website);
		    $('.bio .website').attr('href','http://'+website);
		    $('.bio .bio-text').text(bio);


 	 	});
	}
	
  function getSocialLink(link){
    	if (link.length < 1 || link == undefined){
	    	return false;
	    } else {
	    	return true;
	    }
    }

	// ** replace jquery item with gallery item	
	$('.grid-item').click(function(){
		$('.modal-container').fadeIn();
		avatar = $(this).find('.primary-pic').attr('src');
		// alert(avatar);
		$('.modal .pic').attr('src',avatar);
		$('.modal').addClass('slide-in');
		
		// Get index of item clicked in the DOM
		index = $(this).index();
		getProfile(index);
		
	})

	$('.next-profile').click(function(){
		index = index+1;
		getProfile(index);
	})

	$('.last-profile').click(function(){
		index = index-1;
		getProfile(index);
	})


	// Set up slider functionality

	$('.slider-container').mousedown(function(e){
		var startX = e.clientX;
		var sliderLeftPosX = parseInt($('.slider').css('left'), 10);
		var clicked = true;
		console.log("startX= " + startX);

		$(this).mousemove(function(e){
			console.log("slider left position = " + sliderLeftPosX );
			var finishX = e.clientX;
			
			if(finishX <= startX - 60){
				console.log("newstartX = " + finishX);
				$('.slider').css("left", sliderLeftPosX - 610);
				setInterval(function(){
					$(this).off("mousedown");
				}, 1000);

			}
			if(finishX >= startX + 60){
				console.log("newstartX = " + finishX);
				$('.slider').css("left", sliderLeftPosX + 610);
				setInterval(function(){
					$(this).off("mousedown");
				}, 1000);
			}
			// console.log("pageLeft:" + e.pageX + "left:" + e.clientX + "right:" + e.clientY);
		});
	});

	$('.slider-container').mouseup(function(e){
		$(this).off("mousemove");
	});

	$('.modal button').click(function(){
		$('.modal-container').fadeOut();
		$('.modal').removeClass('slide-in');
	});
		
	//set up instafeed.js
	var feed = new Instafeed({
	    accessToken: '1691322362.1677ed0.43cc655ed4884ffbb58bb593b185fb6a',
	    get: 'user',
	    userId: '1691322362', //change to "1691322362" when feed is available
	    clientId: '30e90425d4c442bba0ee569e2c31f5b5',
	    template: '<a href="{{link}}"  class="instagram-item instagram-{{orientation}}" target="__blank"><img src="{{image}}" /></a>',
	    limit: 10,
	    resolution: 'standard_resolution'
	});
	feed.run();	

	// var $grid = $('.grid').isotope({
	//   masonry: {
	//     // columnWidth: 50
	//   }
	// });

	// $('.grid').isotope({
	//   // options
	//   itemSelector: '.grid-item',
	//    isFitWidth: true
	//   // layoutMode: 'fitRows'
	// });

	$('li.show-all').on('click', function(){
		$('.grid-item').removeClass('highlight');
		$('.grid-item').removeClass('dim');
		
	});
	$('li.show-hyb').on('click', function(){
		$('.grid-item').removeClass('highlight');
		$('.grid-item').addClass('dim');
		$('.grid-item.hyb').addClass('highlight');
		// $('.grid-item.hyb').removeClass('hidden');
	});
	$('li.show-dev').on('click', function(){
		$('.grid-item').removeClass('highlight');
		$('.grid-item').addClass('dim');
		$('.grid-item.dev').addClass('highlight');
		// $('.grid-item').addClass('hidden');
		// $('.grid-item.dev').removeClass('hidden');
	});
	$('li.show-des').on('click', function(){
		$('.grid-item').removeClass('highlight');
		$('.grid-item').addClass('dim');
		$('.grid-item.des').addClass('highlight');
		// $('.grid-item').addClass('hidden');
		// $('.grid-item.des').removeClass('hidden');
	});

	/////////Toggle active class on selected element and remove from previous
	$(".selection").on("click", "li", function() {				
		var $this = $(this);									
	    $this.addClass("active")								
	    .siblings().removeClass("active");						
	});
	$(".headerNav").on("click", "li", function() {				
		var $this = $(this);									
	    $this.addClass("active")								
	    .siblings().removeClass("active");						
	});
	///////////////

	///Smooth Scroll for nav
	$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});


})();

//set up the map
function initMap() {
  var myLatLng = {lat: 43.647054, lng: -79.403410};
  var latlng = new google.maps.LatLng(43.647054, -79.403410);

  

  var map = new google.maps.Map(document.getElementById('map'), {
// <<<<<<< HEAD
//     zoom: 17,
//     center: myLatLng,
// =======
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng,
// >>>>>>> 9e6806fc60c131c3ed8de998cfb0dc5b9773c401

    //map settings
    disableDefaultUI: true,
    zoomControl: false,
  	scaleControl: false,
  	scrollwheel: false,
  	draggable: false,
    
    //custom map theme - https://snazzymaps.com

    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#f4f4f4"}]},
    {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#e3e3e3"}]},
    {"featureType":"road","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":-37}]},
    {"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#b2b2b2"}]},{"featureType":"transit","elementType":"geometry","stylers":
    [{"color":"#f3f3f3"}]}]
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
		icon: 'images/flux-marker.png',
    title: 'Hello World!'
  });



	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
	    var map = this;
	    var ov = new google.maps.OverlayView();
	    ov.onAdd = function() {
	        var proj = this.getProjection();
	        var aPoint = proj.fromLatLngToContainerPixel(latlng);
	        aPoint.x = aPoint.x+offsetX;
	        aPoint.y = aPoint.y+offsetY;
	        map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
	    }; 
	    ov.draw = function() {}; 
	    ov.setMap(this); 
	};

	var bounds = [
	    {min:0,max:500,func: map.setCenterWithOffset(latlng, 0, -110)},
	    {min:501,max:850,func: map.setCenterWithOffset(latlng, 0, -210)},
	    {min:851,func: map.setCenterWithOffset(latlng, 0, -210)}
	];

	// define a resize function. use a closure for the lastBoundry determined.
	var resizeFn = function(){
	    var lastBoundry; // cache the last boundry used
	    return function(){
	        var width = window.innerWidth; // get the window's inner width
	        var boundry, min, max;
	        for(var i=0; i<bounds.length; i++){
	            boundry = bounds[i];
	            min = boundry.min || Number.MIN_VALUE;
	            max = boundry.max || Number.MAX_VALUE;
	            if(width > min && width < max 
	               && lastBoundry !== boundry){
	                lastBoundry = boundry;
	                return boundry.func.call(boundry);            
	            }
	        }
	    }
	};
	$(window).resize(resizeFn()); // bind the resize event handler
	$(document).ready(function(){
	    $(window).trigger('resize'); // on load, init the lastBoundry
	});
}







