"use strict";

(function(){

	// Set up firebase url and variables
	var index;
	var url = new Firebase('https://webd-portfolioshow.firebaseIO.com');

	

	// ** replace jquery item with gallery item	
	$('.profiles li').click(function(e){
		$('.modal').fadeIn();

		// Get index of item clicked in the DOM
		index = $(this).index();

		url.child('students').once('value', function(snapshot) {		    
		    var name = snapshot.val()[index].name;
		    var bio = snapshot.val()[index].bio;
		    var website = snapshot.val()[index].website;
		    console.log(" name: "+ name + ", bio: " + bio + ", website: " + website);

		    $('.bio h3').text(name);
		    $('.bio .website').text(website);
		    $('.bio .bio-text').text(bio);

 	 	});

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
		$('.modal').fadeOut();
	});
		
	//set up instafeed.js
	var feed = new Instafeed({
	    accessToken: '1691322362.1677ed0.43cc655ed4884ffbb58bb593b185fb6a',
	    get: 'user',
	    userId: '11427426', //change to "1691322362" when feed is available
	    clientId: '30e90425d4c442bba0ee569e2c31f5b5',
	    template: '<a href="{{link}}"  class="instagram-item instagram-{{orientation}}" target="__blank"><img src="{{image}}" /></a>',
	    limit: 10,
	    resolution: 'standard_resolution'
	});
	feed.run();	
	

})();

//set up the map
function initMap() {
  var myLatLng = {lat: 43.647054, lng: -79.403410};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng,

    //map settings
    disableDefaultUI: true,
    zoomControl: false,
  	scaleControl: false,
  	scrollwheel: false,
  	draggable: false,
    
    //custom map theme
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},
    {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},
    {"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},
    {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":
    [{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},
    {"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":
    [{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry",
    "stylers":[{"color":"#2c5a71"}]}]
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}



