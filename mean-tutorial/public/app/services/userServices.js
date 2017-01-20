angular.module('userServices', [])
	// Create factory and put $http as a dependency / parameter
	.factory('User', function($http){
		var userFactory = {};

		// This service returns a custom post method and takes regData as parameter
		userFactory.create = function(regData){
			return $http.post('/api/users', regData)
		};

		return userFactory;
	});