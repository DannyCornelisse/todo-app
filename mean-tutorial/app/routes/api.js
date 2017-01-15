// Get User model
var User = require('../models/user'); 


// Public
module.exports = function(router){

	// Make request to '/home' route
	// Bind all methods to 'router' object
	router.get('/home', function(req, res){

		// Respond with
		res.send('Hello from /home mudafaka');
	});

	// Post to localhost:8080/users // Test posts with postman or other rest client 
	router.post('/users', function(req, res){

		var user = new User();
	 
		// Set properties equal to the body of the request ()
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;

		if(req.body.username == null || req.body.username == '' ||
			req.body.password == null || req.body.password == '' ||
			req.body.email == null || req.body.email == ''){
			res.send('please ensure username, email and password are provided!');
		} else {
			user.save(function(err){
			if(err){
				res.send('username or email already exists!' + err);
			} else {
				res.send("user created!");
			}
		});
		}
	});

	// Return the route that user is trying to access
	return router;

}
