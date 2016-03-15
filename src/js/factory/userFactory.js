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
		}
	}
}])