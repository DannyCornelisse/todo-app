angular.module('authServices', [])
	// Create factory  Auth and put $http as a dependency / parameter
	.factory('Auth', function($http, AuthToken){
		var authFactory = {};

		// This service returns a custom post method and takes loginData as parameter
		authFactory.login = function(loginData){
			return $http.post('/api/authenticate', loginData).then(function(data){
				AuthToken.setToken(data.data.token);
				return data;
			});
		};

		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken()){
				return true;
			} else {
				return false;
			}
		};

		authFactory.getUser = function(){
			if(AuthToken.getToken()){
				return $http.post('/api/me');
			} else {
				$q.reject({message: 'User has no token'});
			}
		};

		authFactory.logout = function(){
			AuthToken.setToken();
		};

		return authFactory;
	})

	.factory('AuthToken', function($window){
		var authTokenFactory = {};

		// This service returns
		authTokenFactory.setToken = function(token){
			// Set item in local storage named token and assign param token
			if(token){
				$window.localStorage.setItem('token', token);
			} else {
				this.removeToken();
			}
		};

		authTokenFactory.getToken = function(){
			return $window.localStorage.getItem("token")
		};

		authTokenFactory.removeToken = function(){
			$window.localStorage.removeItem("token")	
		}

		return authTokenFactory;
	})

	.factory('AuthInterceptors', function(AuthToken){
		var AuthInterceptorsFactory = {};

		AuthInterceptorsFactory.request = function(config){
			var token = AuthToken.getToken();

			if(token){
				// Assign token to headers
				config.headers['x-access-token'] = token;
			}

			return config;
		};

		return AuthInterceptorsFactory;
	});