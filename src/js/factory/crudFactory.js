// Create factory
mainModule.factory('crudFactory', ['$http', '$q', function($http, $q) {
	return {
		read: function(model) {
			// Defining $q
			// New defer
			var defer = $q.defer();

			// GEt '+model+' from db
			$http.get("/"+model)
				.then(function(uData) {
					defer.resolve(uData.data);
				}, function(err) {
					defer.reject(err)
				});

			// Return promise object
			return defer.promise;
		},
		readOne: function(model, id) {
			var defer = $q.defer();

			$http.get('/'+model+'/'+id)
				.then(function(uData) {
					defer.resolve(uData.data);
				}, function(err) {
					defer.reject(err)
				});

			return defer.promise;
		},
		update: function(model, elem) {
			var defer = $q.defer();

			$http.post('/'+model, elem)
				.then(function(msg) {
					defer.resolve(msg);
				},
				function(err) {
					defer.reject(err);
				});

			return defer.promise;
		},
		delete: function(model, elem) {
			var defer = $q.defer();

			$http.delete('/'+model+'/'+elem._id)
				.then(function(msg) {
					defer.resolve(msg);
				},
				function(err) {
					defer.reject(err);
				});

			return defer.promise;
		},
        create: function(model, elem) {
            var deferred = $q.defer();

            $http.put('/'+model, elem)
                .then(function (uData) {
                    deferred.resolve(uData.data);
                }, function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
	}
}])