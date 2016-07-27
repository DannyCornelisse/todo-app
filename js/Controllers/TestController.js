angular.module('myApp')

	.controller('TestController', TestController);

function TestController(){
	var vm = this;

	vm.todos = [ 
		"bla", 
		"ojhiuh"
	];

	
	vm.addTodo = function(){
		firebase.database().ref('todos/').push(vm.todoItem);
	};
}