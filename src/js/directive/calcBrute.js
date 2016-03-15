// Get directive
mainModule.directive("calcBrute", [function() {
	return {
		// Where to look for element : A - attribute, E - element(tag)
		restrict: "EA",
		// Get other data, e.g. from other attributes
		scope: {
			// = means gets attr as object i.e at value change this also changes; @ means it only looks at string, no changes detected
			amount: '=',
			label: '@',
			rate: '='
		},
		templateUrl: '/template/calcBrute',
		link: function($scope, el, attr) {
			console.log(attr);
			$scope.rate = $scope.rate ? parseFloat($scope.rate) : 1.27;
			$scope.calcBrutePrice = function(amount) {
				return parseFloat(parseInt(amount) * $scope.rate);
			}
		}
	};
}]);