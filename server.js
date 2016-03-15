// Mddules
var express 	= require('express');
var fs 			= require('fs');
var users 		= require('./model/users');


// users Connection
var mongoose 	= require('mongoose');
mongoose.connect("mongodb://localhost/nodejs");

// Set connection
users.setConnection(mongoose);

/* 
	users.create({
		name: "Papp Laszlo",
		email: "pl@pl.pl",
		phone: "+36707040707",
		address: "1122 Budapest, Palfi u. 12",
		role: 3,
		meta: {
			birth: new Date('1985-07-05'),
			hobby: "Fishing"
		}
	}, 
	function(data) {
		console.info(data);
	});
*/


	users.first({"name":new RegExp("old", 'gi')}, function(u) {
		if (u !== null)
		{
			// var o = new users.getModel('orders');
			// // console.log(o);
			// o._creator = u._id;
			// o.createDate = new Date(),
			// o.description = "First order",
			// o.product = "Csizma",
			// o.quantity = 4,
			// o.price = 5995,
			// o.shippingDate = new Date('2016-06-01');
			// o.save(function(err) {
			// 	console.error(err);
			// });
			console.log(u);
		}
		else
		{
			console.info(null);
		}
	});


/*
	users.getModel().isAdmin({}, function(err, data) {
		console.info(data);
	});
*/

/*
	users.getModel().update({name: new RegExp('b', 'gi')}, {girlFriend:"Piri Piroska"}, function(err, user) {
		if (err)
		{
			consoel.error(err);
		}
	});
*/

/*
	users.getModel().remove({'name': new RegExp('jack', 'gi')}, function(err, rmv) {
		if (err)
		{
			console.error(err);
		}
		else
		{
			console.log("Removed: "+rmv.result);
		}
	});
*/

// Save order to user

// Globals
var port 	= 3333;
var st_dir 	= "build";

// Express object
var app = express();

// Set jade
app.set('view engine', 'jade');
app.set('views', './src/view');

// Static files
app.use(express.static(st_dir, {fallthrough: true}));

// express.use() function

app.use(function(req, res, next) {
	if (req.headers['x-requested-with'] == 'XMLHttpRequest')
	{
		users.getModel().find({}, function(err, data) {
			res.send(JSON.stringify(data));			
		});
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