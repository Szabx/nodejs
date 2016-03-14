/**
 * Mongoose ar
 */
var mongoose 	= require("mongoose");
var Schema 		= mongoose.Schema;
/**
 * MongoDB datamodell
 * for users table
 */
var db,
	users,
	orders
	models = {};
/**
 * [setConnection description]
 * @param {[type]} db [description]
 */
function setConnection(mongoDB) {
	db = mongoDB;
	setModel();
}


function setModel() {
	var uSchema = new Schema({
		name: String,
		email: String,
		phone: String,
		address: String,
		role: Number,
		meta: {
			birth: Date,
			hobby: String
		},
		orders: [
			{type: Schema.Types.ObjectId, ref: 'orders'}
		]
	});

	uSchema.statics.isAdmin = function(obj, callback) {
		return this.find({"role":{$lte:2}}, callback);
	};

	// Collection model
	users = db.model("users", uSchema, 'users');

	// Order schema
	var oSchema = new Schema({
		_creator: {type: Schema.Types.ObjectId, ref: 'users' }, 
		createDate: Date,
		description: String,
		product: String,
		quantity: Number,
		price: Number,
		shippingDate: Date
	});

	orders = db.model('orders', oSchema, 'orders');

	models['users'] 	= users;
	models['orders'] 	= orders;
};

function getModel(modelName)
{
	if(!modelName)
	{
		return users;
	}
	else
	{
		return models[modelName];
	}
}

// Data read from collection
function read(where, callback) {
	// Check param
	if (!where)
	{
		where = {};
	}
	users.find(where, function(err, data) {
		if (err)
		{
			console.error("Error in query execution: "+err+" in: "+where);
			data = [];
		}
		if (callback)
		{
			callback(data);
		}
	});
}

// Query one element 
function first(where, callback) {
	read(where, function(data) {
		var ret;
		if (data.length > 0)
		{
			ret = data[0];
		}
		else
		{
			ret = null;
		}
		callback(ret);
	});	
};

// Insert new data to DB
function create(data, callback) {
	// Create new user model with given dat
	var u = new users(data);
	// Save to DB
	u.save(function(err) { 
		if (err)
		{
			console.error('Saving data failed: '+err);
			callback({});
		}
		else
		{
			callback(data);
		}
	});
}

// Public elelments
module.exports = {
	setConnection:setConnection,
	read:read,
	create:create,
	first: first,
	getModel: getModel
};