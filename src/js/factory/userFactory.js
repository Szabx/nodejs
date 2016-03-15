// Create factory
mainModule.factory('userFactory', ['$http', '$q', function($http, $q) {
	return {
		getAll: function() {
			// Defining $q
			// New defer
			var defer = $q.defer();

			// GEt users from db
			$http.get("/users")
				.then(function(uData) {
					defer.resolve(uData.data);
				}, function(err) {
					defer.reject(err)
				});

			// Return promise object
			return defer.promise;
		},
		updateUser: function(user) {
			var defer = $q.defer();

			$http.post('/users', user)
				.then(function(msg) {
					defer.resolve(msg);
				},
				function(err) {
					defer.reject(err);
				});

			return defer.promise;
		},
		removeUser: function(user) {
			var defer = $q.defer();

			$http.delete('/users/'+user._id)
				.then(function(msg) {
					defer.resolve(msg);
				},
				function(err) {
					defer.reject(err);
				});

			return defer.promise;
		}
	}
}])