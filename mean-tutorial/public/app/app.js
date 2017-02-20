// Create angular module with name and dependency injections
// All other modules are loaded here as dependencies zo you don't have to use ng-app all the time
angular.module('userApp',['appRoutes', 'userControllers', 'userServices','mainController', 'authServices'])

.config(function($httpProvider){
	// Intercept all http requests with AuthInterceptors and assign token to header
	$httpProvider.interceptors.push('AuthInterceptors');
});