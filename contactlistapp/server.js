// set up new app using express framework
var express = require('express');
var app = express();
// setup mongo database with mongojs
var mongojs = require('mongojs');
// Create new db with ('name of db','table of db??')
var db = mongojs('contactlist',['contactlist']);

// The body parser is needed to parse js objects to json to put in the db
var bodyParser = require("body-parser");

// Use the body parser to parse objects to json
app.use(bodyParser.json());

//use static content (html, css, js from folder named public)
app.use(express.static(__dirname + "/public"));

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


app.post('/contactlist', function (req, res) {
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function(req, res){
	// Set id from request as a new variable
	var id = req.params.id;
	// Pass id to remove from mongodb
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		// Respond with doc, which is the contact item
		res.json(doc);
	})
});

// when GET "contactlist/:id", respond with id
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
  	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {
			name: req.body.name, 
			email: req.body.email,
			number: req.body.number
		}},
		new: true}, function(err, doc){
			res.json(doc);		
		});
  
});

// set up local host on port
app.listen(3000);
console.log('server running from port 3000');