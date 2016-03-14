/**
 * MongoDB datamodell
 * for users table
 */
var db,
	users;
/**
 * [setConnection description]
 * @param {[type]} db [description]
 */
function setConnection(mongoDB) {
	db = mongoDB;
	setModel();
}


function setModel() {


	// Collection model
	users = db.model("users", {
		name: String,
		email: String,
		phone: String,
		address: String,
		role: Number,
		meta: {
			birth: Date,
			hobby: String
		}
	}, 'users');
};

// Data read from collection
function read(where, callback) {
	if (!where)
	{
		where = {};
	}
	users.find(where, function(err, data) {
		if (err)
		{
			console.error("Error in query execution: "+err+" in: "+where);
			if (callback)
			{
				callback({});
			}
		}
		else
		{
			if (callback)
			{
				callback(data);
			}
		}
	});
}

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
	create:create
};