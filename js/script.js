"use strict";

(function(){

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
	    userId: '11427426', //change to "1691322362" when feed is available
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

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng,

    //map settings
    disableDefaultUI: true,
    zoomControl: false,
  	scaleControl: false,
  	scrollwheel: false,
  	draggable: false,
    
    //custom map theme - https://snazzymaps.com
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



