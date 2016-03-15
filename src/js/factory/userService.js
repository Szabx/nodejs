mainModule.service('userService', ['crudFactory', '$q', function(crudFactory, $q) {
	var service = this;
	service.u = [];
	service.m = 'users';

	// Get all users
	service.getAll = function() {
		var def = $q.defer();
		crudFactory.read(service.m)
			.then(function(userData) {
				def.resolve(userData);
			}, function(err) {
				def.reject(err);
			});
		return def.promise;
	}

	service.getOne = function(id) {
		var def = $q.defer();
		crudFactory.readOne(service.m, id)
			.then(function(userData) {
				def.resolve(userData);
			}, function(err) {
				def.reject(err);
			});
		return def.promise;
	}

	service.updateUser = function(row) {
		var def = $q.defer();
		crudFactory.update(service.m, row)
			.then(function(userData) {
				def.resolve(userData);
			}, function(err) {
				def.reject(err);
			});
		return def.promise;
	};
	service.removeUser = function(row) {
		var def = $q.defer();
		crudFactory.delete(service.m, row)
			.then(function(userData) {
				def.resolve(userData);
			}, function(err) {
				def.reject(err);
			});
		return def.promise;
	};

	service.createUser = function(row) {
		var def = $q.defer();
		crudFactory.create(service.m, row)
			.then(function(userData) {
				def.resolve(userData);
			}, function(err) {
				def.reject(err);
			});
		return def.promise;
	}
}]);