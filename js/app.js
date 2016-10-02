angular.module('myApp', []);

angular.module('myApp')

	.directive('myTodos', function(){
	    return {
	      restrict: 'EA',
	      templateUrl: '../../templates/TodoView.html',
	    };
	  });