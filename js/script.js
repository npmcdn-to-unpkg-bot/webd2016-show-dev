(function(){

	var url = new Firebase('https://webd-portfolioshow.firebaseIO.com');
	
	url.child('students').once('value', function(snapshot) {
	    var i = 0;
	    
	    var name = snapshot.val()[i].name;
	    var bio = snapshot.val()[i].bio;
	    var website = snapshot.val()[i].website;
	    console.log(" name: "+ name + ", bio: " + bio + ", website: " + website);
 	 });

})();
