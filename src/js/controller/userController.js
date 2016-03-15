mainModule.controller('userController', ['$scope', 'userService', '$timeout', function($scope, userService, $timeout) {
	
	// Controller globals
	$scope.u 			= [];
	$scope.ths 			= ["#", "name", "email", "phone", "address", "action"];
    $scope.newUser 		= {};
    $scope.formError 	= {};
    $scope.showTable 	= false;

	userService.getAll().then(function(userData) {
		$scope.u 	= userData;
		$timeout(function() {
			$scope.showTable = true
		}, 500);
	}, function(err) {
		console.error("Error: ", err);
	});

	userService.getOne('56e6be744bd9d5641946df70')
		.then(function(user) {
			console.info(user);
		});

	$scope.updateRecord = function(row) {
		userService.updateUser(row)
			.then(function() {
				alert('Success!');
			},
			function(err) {
				console.error("Error: ", err);
			});
	};
	$scope.removeRecord = function(row) {
		userService.removeUser(row)
			.then(function(deleted) {
				alert('Removed!');
			},
			function(err) {
				console.error("Error: ", err);
			});
	};
	
    $scope.checkNewUser = function(row) {
        var fields = ['name', 'email', 'phone', 'address'];
        var returnValue = true;
        for ( var k in fields ) {
            if ( row[fields[k]] == "" || angular.isUndefined(row[fields[k]]) ) {
                returnValue = false;
            }
        }
        return returnValue;
    };

	$scope.addRecord = function(row) {
		if (!$scope.checkNewUser(row)) {
			return
		}
		userService.createUser(row)
			.then(function(nUser) {
				$scope.newUser = {};
			}); 
	}
}]);