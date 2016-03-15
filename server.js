// Mddules
var express 	= require('express');
var fs 			= require('fs');
var bodyParser 	= require('body-parser')

// users Connection
var mongoose 	= require('mongoose');
mongoose.connect("mongodb://localhost/nodejs");

// Global models var
var models 		= {};

// Users model in global models
models.users 	= require('./model/users');
models.orders 	= require('./model/orders');

// Set users model connection
models.users.setConnection(mongoose);
models.orders.setConnection(mongoose);

// Save order to user

// Globals
var port 	= 3333;
var st_dir 	= "build";

// Express object
var app = express();

// Set jade
app.set('view engine', 'jade');
app.set('views', './src/view');

// Bodyparser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static(st_dir, {fallthrough: true}));

// express.use() function

app.use('/:model/:id*?', function(req, res, next) {
	if (req.headers['x-requested-with'] == 'XMLHttpRequest' && req.params.model !== 'template')
	{
		switch (req.method.toLowerCase()) {
			case 'get': 
				var query = {};
				if (req.params.id) {
					query = {"_id":req.params.id}
				}
				models[req.params.model].getModel().find(query, function(err, data) {
					if (req.params.id) {
						res.send(JSON.stringify(data[0]));	
					}
					else {
						res.send(JSON.stringify(data));	
					}
				});
				break;
			case 'post':
				// Catch data packages
				var req_body = req.body;

				var query 	= {_id: req_body._id}
				var nData 	= {};
				for (var i in req_body) {
					if (i == "_id")
					{
						continue;
					}
					nData[i] = req_body[i]
				}

				models[req.params.model].getModel().update(query, nData, function(err, data) {
					res.send('{"Success":true}');	
				});
				break;
			case 'delete':
				if (req.params.id)
				{
					var query = {_id: req.params.id};
					models[req.params.model].getModel().remove(query, function(err, rmv) {
						if (err)
						{
							console.error(err);
						}
						res.send(JSON.stringify(rmv))
					});
				}
				else
				{
					res.send('{"error":"No id recieved"}');
				}
				break;
			case 'put':
				var req_body = req.body;

				var nData 	= {};
				for (var i in req_body) {
					if (i == "_id")
					{
						continue;
					}
					nData[i] = req_body[i]
				}

				models[req.params.model].getModel().create(nData, function(err, data) {
					if(err) {
						console.error("Error: ", err);
						res/send('{"Success":false}');
					}
					else {
						res.send('{"Success":true}');
					}	
				});
				break;
			default:
				res.send('{"error": "Unsopported method"}');
				break;
		}
	}
	else
	{
		next();
	}
});

// Setup server (get request)
// When a request is sent to root, function executes
app.get('/', function (req, res) {
	handleUsers(req, res, false, false, function(users) {
		// Read index file from jade engine
		res.render('index', { title: 'Hey', message: 'Hello there!', usr: users});
	});

	// Classical: read index file by path

	// fs.readFile('./' + st_dir + '/index.html', 'utf8', function(err, data) 
	// {
	// 	res.send(data);
	// });
});

// Update user, look for 

// Users model
function handleUsers(req, res, id, next, callback)
{
	fs.readFile('./users.json', 'utf8', function(err, data) {
		if (err) throw err;
		var users 	= JSON.parse(data);
		var _user 	= {};

		if (callback)
		{
			callback(users);
			return;
		}

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

// Template requests
app.get('/template/:name', function(req, res, next) {
	if (!req.params.name) {
		next();
	} else {
		res.render('template/'+req.params.name);
	}
})

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