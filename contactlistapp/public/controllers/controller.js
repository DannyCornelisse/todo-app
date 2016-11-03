var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	// Refresh contactlist
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
		// Post to contactlist the contact and in callback refresh the contact list
		$http.post("/contactlist", $scope.contact).success(function(response){
			refresh();
		});
	};

	// Remove contact based on its id
	$scope.remove = function(id){
		// Remove contact based on its id from contactlist table
		$http.delete("/contactlist/" + id).success(function(response){
			refresh();
		});
	}

	$scope.edit = function(id){
		console.log(id);
		$http.get("/contactlist/" + id).success(function(response){
			// Set the response from the GET req equal to $scope.contact, so it will fill in the inputfields in the view 
			$scope.contact = response;
		});
	}
	$scope.updateContact = function(){
		console.log($scope.contact._id);
		// Get the id of the $scope.contact in the inputfield, then put the $scope.contact  
		// object (which is in the input fields) in its place in the db
		$http.put("/contactlist/" + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	}
	$scope.deselect = function() {
		$scope.contact = "";
	}
}]);