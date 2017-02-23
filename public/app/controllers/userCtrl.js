// Create module with dependency userServices
angular.module('userControllers',['userServices'])

	.controller('regCtrl', function($http, $location, $timeout, User){

		var app = this;

		app.regUser = function(regData){
			app.errorMsg = false;
			app.loading = true;
			// http post request using $http injection (also injected in function) (post method is provided by userServices.js)
			User.create(app.regData)
				// Respond with function to console.log the data from the post
				.then(function(data){
					// If get succes back from api
					if(data.data.success){
						// Create success message
						app.loading = false;
						app.successMsg = data.data.message;

						// Redirect to home with 2sec timeout
						$timeout(function(){
							$location.path('/');
						}, 2000);
					} else {
						// Cretate error Message
						app.loading = false;
						app.errorMsg = data.data.message; 
					}
				})
		}
	});
