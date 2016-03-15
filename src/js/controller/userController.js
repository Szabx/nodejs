mainModule.controller('userController', ['$scope', 'userService', function($scope, userService) {
	$scope.u = [];
	userService.getAll().then(function(userData) {
		$scope.u 	= userData;
		$scope.ths 	= ["#", "name", "email", "phone", "address"];
	}, function(err) {
		console.error("Error: ", err);
	});
}]);