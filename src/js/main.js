// Get users from json
jQuery.getJSON('users', function(users) {
	/*optional stuff to do after success */
	console.log(users);
	var a 	= "Hello World!";
	if(true)
	{
		console.log(a);
	}
	// Write to paragraph
	// $("body").append("<p>" + JSON.stringify(users) + "</p>");
});