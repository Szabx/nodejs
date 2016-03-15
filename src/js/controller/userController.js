mainModule.controller('userController', ['$scope', 'userService', 'userFactory', function($scope, userService, userFactory) {
	$scope.u = [];
	userService.getAll().then(function(userData) {
		$scope.u 	= userData;
		$scope.ths 	= ["#", "name", "email", "phone", "address", "action"];
	}, function(err) {
		console.error("Error: ", err);
	});

	$scope.updateRecord = function(row) {
		userFactory.updateUser(row)
			.then(function() {
				alert('Success!');
			},
			function(err) {
				consoel.error("Error: ", err);
			});
	};
	$scope.removeRecord = function(row) {
		userFactory.removeUser(row)
			.then(function(deleted) {
				alert('Removed!');
			},
			function(err) {
				consoel.error("Error: ", err);
			});
	};
}]);