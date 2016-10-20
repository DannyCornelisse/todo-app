var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {


	var refresh = function(){
		// Get "/contactlist" from server from server.js and when succes exe function
		$http.get("/contactlist").success(function(response){
			console.log("I recieved the contactlist data");
			$scope.contactlist = response;
			// Clean input boxes after refreshing/clicking add contact
			$scope.contact = "";
		});
	};

	// Init refresh function on page load
	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		// Post to contactlist the contact
		$http.post("/contactlist", $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

    // Added contactlist property to scope object and set it equal to contactlist var
    //$scope.contactlist = contactlist;
}]);