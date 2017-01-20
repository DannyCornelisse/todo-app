angular.module('authServices', [])
	// Create factory and put $http as a dependency / parameter
	.factory('Auth', function($http){
		var authFactory = {};

		// This service returns a custom post method and takes regData as parameter
		authFactory.login = function(regData){
			return $http.post('/api/users', regData)
		};

		return authFactory;
	});