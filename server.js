// Mddules
var express = require('express');
var fs 		= require('fs');

// Globals
var port 	= 3333;
var st_dir 	= "build";

// Express object
var app = express();

// Static files
app.use(express.static(st_dir, {fallthroigh: true}));

// express.use() function

app.use(function(req, res, next) {
	console.log("request url: ", req.url);
	next();
});

// Setup server (get request)
// When a request is sent to root, function executes
app.get('/', function (req, res) {
	fs.readFile('./' + st_dir + '/index.html', 'utf8', function(err, data) 
	{
		res.send(data);
	});
});

// Users model
function handleUsers(req, res, id)
{
	fs.readFile('./users.json', 'utf8', function(err, data) {
		if (err) throw err;
		var users 	= JSON.parse(data);
		var _user 	= {};

		if (!id)
		{
			_user = users;
		}
		else
		{
			for (var i in users) 
			{
				if (id == users[i].id)
					_user = users[i];
			}
		}

		res.send(JSON.stringify(_user));
	});
}

// Read user.json
app.get('/users/:id*?', function(req, res) 
{
	var id = req.params.id;
	// console.log(req.url);
	handleUsers(req, res, id);
	// res.send("Hellow world again!");
});

// Listening port
app.listen(port);

console.log("Server running in localhost:" + port);