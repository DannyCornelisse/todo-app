angular.module('todoController',['authServices', 'todoServices'])
	
	.controller('todoCtrl', function($http, Auth, Todo){
		var app = this;
		app.todos = [];
		app.username = null;
		app.currentTodoIndex = null;
		app.showEditField = false;
		app.noTodos = false;

		console.log(Todo);

		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){

				app.username = data.data.username;

				Todo.getTodos(app.username).then(function(data){
					if(data.data.user.todos){
						app.todos = data.data.user.todos;
						if(app.todos.length === 0)	app.noTodos = true;
					}
				})
			});
		}

		app.toggleEditField = function(index){
			app.currentTodoIndex = index;
			app.showEditField = true;
			app.editedTodoValue = app.todos[app.currentTodoIndex];
		};

		app.editTodo = function(){
			if(app.currentTodoIndex !== null){
				var index = app.currentTodoIndex;
				app.todos[index] = app.editedTodoValue;
			}

			Todo.updateTodos(app.username, app.todos);

			app.currentTodoIndex = null;
			app.editedTodoValue = "";
			app.showEditField = true;
		};

		app.addTodo = function(){
			console.log(app.newTodo);
			if(app.newTodo !== ""){	
				app.todos.push(app.newTodo);

				Todo.updateTodos(app.username, app.todos);

				app.newTodo = "";
			}
		};

		app.deleteTodo = function(index){
			app.todos.splice(index, 1);

			Todo.updateTodos(app.username, app.todos);

			app.showEditField = false;
		};
	});