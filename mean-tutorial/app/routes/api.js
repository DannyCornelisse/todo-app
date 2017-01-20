// Get User model
var User = require('../models/user'); 


// Public
module.exports = function(router){

	// Make request to '/home' route
	// Bind all methods to 'router' object

	// Post to localhost:8080/users // Test posts with postman or other rest client // Registration user
	router.post('/users', function(req, res){

		var user = new User();
	 
		// Set properties equal to the body of the request ()
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;

		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			res.json({success: false, message: 'please ensure username, email and password are provided bla!'});
		} else {
			user.save(function(err){
			if(err){
				res.json({success: false, message: 'username or email already exists!'});
			} else {
				res.json({success: true, message: "user created!"});
			}
		});
		}
	});

	// Login User
	router.post('/authenticate', function(req, res){
		User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({success: false, message: 'could not authenticate user!'});
			} else if (user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.json({success: false, message: 'could not authenticate password!'});
				} else {
					res.json({success: true, message: 'User authenticated!'});
				}
			}
		})
	});

	// Return the route that user is trying to access
	return router;

}
