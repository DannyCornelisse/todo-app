// Require express framework
var express = require('express');

// Create express app 
var app = express();

// Require morgan to log all requests in console
var morgan = require('morgan');

// Let app use morgan with method 'dev'
app.use(morgan('dev'));

// Require mongoose for mongodb
var mongoose = require('mongoose');

// Get User model
var User = require('./app/models/user'); 

// Use parser to parse body into json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/tutorial', function(err){

	if(err){
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Succesfully connected to the db');
	}

});

// Make request to '/home' route
app.get('/home', function(req, res){

	// Respond with
	res.send('Hello from /home mudafaka');
});

// Post to localhost:8080/users // Test posts with postman or other rest client 
app.post('/users', function(req, res){

	var user = new User();
	// Set properties equal to the body of the request ()
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.save();
	res.send("user created!")
});

// Create port to listen to
var port = process.env.PORT || 8080;

// Let app listen for port
app.listen(port, function(){

	// Create callback function to let know that server is running
	console.log("Listening to port: " + port + ' mudafaka');

});

/* Get default route ('/') and send response <-- TEST
// app.get('/', function(req, res){

	// Upon request, send response
	// res.send("Hello World");


// });
*/
