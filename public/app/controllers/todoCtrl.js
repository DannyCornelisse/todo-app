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
			app.editedTodo = app.todos[app.currentTodoIndex];
		}

		app.editTodo = function(){
			if(app.currentTodoIndex !== null){
				var index = app.currentTodoIndex;
				app.todos[index] = app.editedTodo;
			}

			$http.put('api/users/' + app.username, app.todos).then(function(data){
				console.log(data);
			});

			app.currentTodoIndex = null;
			app.showEditField = false;
			app.editedTodo = "";
		};

		app.addTodo = function(){
			console.log(app.newTodo);
			if(app.newTodo !== ""){	
				app.todos.push(app.newTodo);

				$http.put('api/users/' + app.username, app.todos).then(function(data){
					console.log(data);
				});

				app.newTodo = "";
			}
		};

		app.deleteTodo = function(index){
			app.todos.splice(index, 1);

			$http.put('api/users/' + app.username, app.todos).then(function(data){
				console.log(data);
			});
		};

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