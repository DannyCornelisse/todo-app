angular.module('todoServices', [])

	.factory('Todo', function($http){
		var todoFactory = {};
		
		todoFactory.updateTodos = function(username, todos){
			return $http.put('api/users/' + username, todos);
		};

		todoFactory.getTodos = function(username){
			return $http.get('api/users/'+ username);
		}

		return todoFactory;
	});