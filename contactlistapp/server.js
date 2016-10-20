// set up new app using express framework
var express = require('express');
var app = express();
// setup mo
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

// The body parser is needed to parse js objects to json to put in the db
var bodyParser = require("body-parser");

//use static content (html, css, js from folder named public)
app.use(express.static(__dirname + "/public"));

// Use the body parser to parse objects to json
app.use(bodyParser.json());

// When GET "/contactlist", respond with contactlist
app.get("/contactlist", function(req, res){
	console.log('I recieved a get request');
	// find the data in the contactlist in db
	db.contactlist.find(function(err, docs){
		console.log(docs);


		// respond with json of docs (docs in contactlist)
		res.json(docs);
	});
});

// app.post("/contactlist", function(req, res){
// 	// Post new contact to db
// 	db.contactlist.insert(req.body, function(err, doc){
// 		// Respond with docs
// 		res.json(docs);
// 	});
// })

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

// set up local host on port
app.listen(3000);
console.log('server running from port 3000');