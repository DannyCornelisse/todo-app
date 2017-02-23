angular.module('todoController',['authServices'])
	
	.controller('todoCtrl', function($http, Auth){
		var app = this;
		app.todos = [];

		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){
				app.username = data.data.username;
				$http.get('api/users/'+ app.username).then(function(data){
					app.todos = data.data.user.todos;
				})
			});
		}
	});