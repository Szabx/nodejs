// Get users from json
jQuery.getJSON('users', function(users) {
	/*optional stuff to do after success */
	console.log(users);

	if(true)
	{
		console.log();
	}
	// Write to paragraph
	// $("body").append("<p>" + JSON.stringify(users) + "</p>");
});