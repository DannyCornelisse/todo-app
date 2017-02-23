// Private stuff

// Get User model
var User = require('../models/user');
// Json webtoken to keep user logged in
var jwt = require('jsonwebtoken');
// Create secret string
var secret = 'harrypotter';


// Public
module.exports = function(router){

	// Make request to '/home' route
	// Bind all methods to 'router' object

	// Post to localhost:8080/users // Test posts with postman or other rest client // Registration user
	router.get("/users/:username", function(req, res){
		console.log('I recieved a get request');
		console.log(req.params);
		User.findOne({username: req.params.username}, function(err, user){
			if (err){
				res.send(err);
			} else {
				 if(!user){
				 	res.send('User doesnt exist');
				 } else {
				 	res.json({user: user});
				 }
			}
		})
	});
	router.post('/users', function(req, res){

		var user = new User();
	 
		// Set properties equal to the body of the request ()
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.todos = req.body.todos;

		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			res.json({success: false, message: 'please ensure username, email and password are provided bla!'});
		} else {
			user.save(function(err){
			if(err){
				res.json({success: false, message: 'username or email already exists!'});
			} else {
				res.json({success: true, message: "user created!", user: user});
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
				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({success: false, message: 'No password provided!'});
				}

				if(!validPassword){
					res.json({success: false, message: 'could not authenticate password!'});
				} else {
					// Create webtoken that expires after 24h
					var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
					// Respond with succes (bool), message (string), token(string)
					res.json({
						success: true, 
						message: 'User authenticated!', 
						token: token
					});
				}

			}
		})
	});

	// Middleware use()
	router.use(function(req, res, next){
		// Get token from request from either: token, url, x-access-token???
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			// Verify token
			jwt.verify(token, secret, function(err, decoded){
				if (err) {
					res.json({success: false, message: 'Token invalid'});
				} else {
					req.decoded = decoded;
					next();
				}
			})
		} else {
			res.json({success: false, message: 'No token provided!'});
		}
	});
	// route for token
	router.post('/me', function(req, res){
		res.send(req.decoded);
	});

	// Return the router that user is trying to access
	return router;

}
