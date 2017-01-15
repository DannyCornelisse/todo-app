// Require express framework
var express = require('express');

// Create express app 
var app = express();

// Create port to listen to
var port = process.env.PORT || 8080;

// Require morgan to log all requests in console
var morgan = require('morgan');

// Require mongoose for mongodb
var mongoose = require('mongoose');

// Require all app routes from api.js and pass the router object to the module.exports function
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);

// Import npm body parser
var bodyParser = require('body-parser');

// Use path
var path = require('path');

// Log all requests
app.use(morgan('dev'));

// Use parser to parse req body into json
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Give user access to static location (public)
app.use(express.static(__dirname + '/public'));

// Let app use the appRoutes and put '/api' as a prefix to the routes: e.g. http://localhost:8080/api/users
app.use('/api', appRoutes);

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/tutorial', function(err){

	if(err){
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Succesfully connected to the db');
	}

});

// Let app listen for port
app.listen(port, function(){

	// Create callback function to let know that server is running
	console.log("Listening to port: " + port + ' mudafaka');

});

// When user goes to any route (*), use the index.html as template
app.get('*', function(req, res){


	// Respond with index html
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));

});