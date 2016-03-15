/**
 * Mongoose ar
 */
var mongoose 	= require("mongoose");
var Schema 		= mongoose.Schema;
/**
 * MongoDB datamodell
 * for orders table
 */
var db,
	orders;
/**
 * [setConnection description]
 * @param {[type]} db [description]
 */
function setConnection(mongoDB) {
	db = mongoDB;
	setModel();
}


function setModel() {
	// Order schema
	var oSchema = new Schema({
		user_id: String, 
		createDate: Date,
		description: String,
		product: String,
		quantity: Number,
		price: Number,
		shippingDate: Date
	});

	orders = db.model('orders', oSchema, 'orders');
};

function getModel(modelName)
{
	return orders;
}

// Data read from collection
function read(where, callback) {
	// Check param
	if (!where)
	{
		where = {};
	}
	orders.find(where, function(err, data) {
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
	var u = new orders(data);
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