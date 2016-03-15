mainModule.controller('nameController', ['$scope', '$http', function($scope, $http) {
	$scope.yourPrice = 1526;
	$scope.$watch('yourPrice', function(newVal, oldVal) {
		console.log(newVal, oldVal);
	});
}]);