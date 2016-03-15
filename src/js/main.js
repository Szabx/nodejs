/**
 * Modules
 * Controllers
 * Factory
 * Service
 * Directive
 */


// Main module def
var mainModule = angular.module("mainModule", []);

// Before parsing controlllers etc
mainModule.run(["$http", function($http) {
	$http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
}]);