angular.module('mainController',['authServices'])
	// Take Auth as parameter
	.controller('mainCtrl', function($http, Auth, $timeout, $location, $rootScope){
		
		var app = this;

		// When route changes, invoke function
		$rootScope.$on('$routeChangeStart', function(){

			if(Auth.isLoggedIn()){

				app.isLoggedIn = true;

				Auth.getUser().then(function(data){

					app.username = data.data.username;
					app.useremail = data.data.email;

				});
			} else {
				
				app.username = undefined;
				app.isLoggedIn = false;
				
			}
		});

		app.doLogin = function(loginData){
			app.errorMsg = false;
			app.loading = true;
			// http post request using $http injection (also injected in function) (post method is provided by userServices.js)
			Auth.login(app.loginData)
				// Respond with function to console.log the data from the post
				.then(function(data){
					// If get succes back from api
					if(data.data.success){
						// Create success message
						app.loading = false;
						app.successMsg = data.data.message;

						// Redirect to home with 2sec timeout
						$timeout(function(){
							$location.path('/about');

							// Reset login data in input fields and message
							app.successMsg = "";
							app.loginData = undefined;
						}, 2000);
					} else {
						// Cretate error Message
						app.loading = false;
						app.errorMsg = data.data.message; 
					}
				})

		};
		app.logout = function(){
			Auth.logout();
			$location.path('/logout');
			app.username = undefined;
			$timeout(function() {
				$location.path('/');
			}, 2000);
		}
	});