angular.module('userControllers',[])

	.controller('regCtrl', function($http, $location, $timeout){

		var vm = this;

		vm.regUser = function(regData){
			console.log(this.regData);
			vm.errorMsg = false;
			vm.loading = true;
			// http post request using $http injection (also injected in function)
			$http.post('/api/users', this.regData)
				// Respond with function to console.log the data from the post
				.then(function(data){
					// If get succes back from api
					if(data.data.success){
						// Create success message
						vm.loading = false;
						vm.successMsg = data.data.message;

						// Redirect to home with 2sec timeout
						$timeout(function(){
							$location.path('/');
						}, 2000);
					} else {
						// Cretate error Message
						vm.loading = false;
						vm.errorMsg = data.data.message; 
					}
				})

		}
	});
