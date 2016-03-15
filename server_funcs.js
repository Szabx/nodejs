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