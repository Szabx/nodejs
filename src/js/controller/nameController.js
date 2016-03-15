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
}]);