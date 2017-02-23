angular.module('todoController',['authServices'])
	
	.controller('todoCtrl', function($http, Auth){
		var app = this;
		app.todos = [];
		app.username = null;
		app.currentTodoIndex = null;
		app.showEditField = false;

		app.getCurrentTodoIndex = function(index){
			app.currentTodoIndex = index;
			app.showEditField = true;
			console.log(app.showEditField);
		}

		app.editTodo = function(){
			console.log(app.editedTodo);
			if(app.currentTodoIndex !== null){
				var index = app.currentTodoIndex;
				app.todos[index] = app.editedTodo;
				console.log(app.todos);
			}
			$http.put('api/users/' + app.username, app.todos).then(function(data){
				console.log(data);
			});
			app.currentTodoIndex = null;
			app.showEditField = false;
			app.editedTodo = "";
		}

		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){
				app.username = data.data.username;
				$http.get('api/users/'+ app.username).then(function(data){
					console.log(data);
					app.todos = data.data.user.todos;
				})
			});
		}
	});