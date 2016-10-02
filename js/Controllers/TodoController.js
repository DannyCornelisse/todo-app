angular.module('myApp')

	.controller('TodoController', TodoController);

// dependancy injection --> $timeout function angular
TodoController.$inject = ['$timeout'];

// dependancy
function TodoController($timeout, $firebaseArray){
	var vm = this,
		db = firebase.database();

	vm.todos = [];

	db.ref('todos/').on('child_added', function(todoData) {
		console.log(todoData.key());
		vm.todos = todoData.val();
	});

	db.ref('todos/').once('value').then(function(todoData) {
	  	$timeout(function() {
	  	vm.todos = todoData.val();
	  	//console.log(firebase.database().ref('todos/').child(0));
	  });
	});


	vm.addTodo = function(){
		//console.log('totalTodos: ', Object.keys(vm.todos));
		var totalTodos = {};
		totalTodos = Object.keys(vm.todos).length || 0;
		totalTodos++;
		var todoId = 'todo-' + totalTodos;
		
		db.ref('todos/' + todoId + '/name/').set(vm.todoName);
		db.ref('todos/' + todoId + '/id/').set(todoId);
	};


	vm.deleteTodo = function(todo) {
		vm.remove.$remove(todo);

	// 	db.ref('todos/'+ todoId).remove().then(function() {
	// 		console.log('Deleted');
	// 	}).catch(function(error) {
	// 		console.error('Not deleted: ', error);
	// 	});
	}

	vm.editTodo = function() {
		console.log('test');
	}

}