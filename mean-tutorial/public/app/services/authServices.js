angular.module('authServices', [])
	// Create factory  Auth and put $http as a dependency / parameter
	.factory('Auth', function($http){
		var authFactory = {};

		// This service returns a custom post method and takes loginData as parameter
		authFactory.login = function(loginData){
			return $http.post('/api/authenticate', loginData)
		};

		return authFactory;
	});