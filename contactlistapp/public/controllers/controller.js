var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    // Get "/contactlist" from server from server.js and when succes exe function
	$http.get("/contactlist").success(function(response){
		console.log("I recieved the contactlist data");
		$scope.contactlist = response;	
	})

    // Added contactlist property to scope object and set it equal to contactlist var
    //$scope.contactlist = contactlist;
}]);