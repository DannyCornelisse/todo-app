// Create angular module with name and dependency injections
angular.module('appRoutes',['ngRoute'])

	.config(function($routeProvider, $locationProvider){
		$routeProvider
		
		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		})
		.when('/about', {
			templateUrl: 'app/views/pages/about.html'
		})
		.when('/register', {
			templateUrl: 'app/views/pages/users/register.html',
			controller: 'regCtrl',
			controllerAs: 'register'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/users/login.html'
			// Controller and controllerAs defined in index.html to use in all routes
		})
		.when('/logout', {
			templateUrl: 'app/views/pages/users/logout.html'
		})
		.when('/profile', {
			templateUrl: 'app/views/pages/users/profile.html'
		})
		.otherwise( {redirectTo: '/'} )

		$locationProvider.html5Mode(true);
	});