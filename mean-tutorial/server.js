// Require express framework
var express = require('express');

// Create express app 
var app = express();

// Require morgan to log all requests in console
var morgan = require('morgan');

// Require mongoose for mongodb
var mongoose = require('mongoose');

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/tutorial', function(err){

	if(err){
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Succesfully connected to the db');
	}

});

// Let app use morgan with method 'dev'
app.use(morgan('dev'));

// Make request to '/home' route
app.get('/home', function(req, res){

	// Respond with
	res.send('Hello from /home mudafaka');
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
