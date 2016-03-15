mainModule.service('userService', ['userFactory', '$q', function(userFactory, $q) {
	var service = this;
	service.u = []
	service.getAll = function() {
		var def = $q.defer();
		if(service.u.length < 1) {
			userFactory.getAll()
				.then(function(users) {
					service.u = users;
					def.resolve(users);
				});
		}
		else
		{
			def.resolve(service.u);
		}

		return def.promise;
	}
}]);