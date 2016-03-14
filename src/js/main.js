// Main module def
var mainModule = angular.module("mainModule", []);

// Before parsing controlllers etc
mainModule.run(["$http", function($http) {
	$http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
}]);

mainModule.controller('nameController', ['$scope', '$http', function($scope, $http) {
	

	$scope.yourName = "a b";
	$scope.$watch('yourName', function(newVal, oldVal) {
		console.log(newVal, oldVal);
	});

	$scope.otherName = function(name) {
		if (name) {
			return name.split(' ')[0] + ' John';
		}
	};

	$scope.anotherName = function(name) {
		if (name) {
			return name.split(' ')[0] + ' Jack';
		}
	};

	// GEt users from db
	$http.get("/users")
		.then(function(data) {
			console.log(data);
		});
}]);