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
		.otherwise( {redirectTo: '/'} )

		$locationProvider.html5Mode(true);
	});