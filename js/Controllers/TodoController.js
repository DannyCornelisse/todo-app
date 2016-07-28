angular.module('myApp')

	.controller('TodoController', TodoController);

// dependancy injection --> $timeout function angular
TodoController.$inject = ['$timeout'];

// dependancy
function TodoController($timeout){
	var vm = this,
		db = firebase.database();


	vm.addTodo = function(){
		db.ref('todos/').push({
			name: vm.todoItem
		});
	};

	vm.getRefTodoItem = function() {}

	vm.deleteTodo = function(item) {
		//var index = vm.todos.indexOf(item);
		var todoRef = Object.keys(vm.todos)[0];
		console.log(vm.todos.name);
		db.ref('todos/-KNkbATt0AuxyK5FxWZk').remove();
		//db.ref('todos/').remove("-KNkbATt0AuxyK5FxWZk");

		
		// vm.todos.splice(index, 1);
	}

	vm.editTodo = function() {
		console.log('test');
	}

	db.ref('todos/').on('value', function(todoData) {
	  vm.todos = todoData.val();
	});

	db.ref('todos/').once('value').then(function(todoData) {
	  $timeout(function() {
	  	vm.todos = todoData.val();
	  	//console.log(firebase.database().ref('todos/').child(0));
	  });
	});
}