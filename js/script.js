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
		
	
	

})();
