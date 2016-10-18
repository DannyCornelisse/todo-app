// set up new app using express framework
var express = require('express');
var app = express();

//use static content (html, css, js from folder named public)
app.use(express.static(__dirname + "/public"));
// When GET "/contactlist", respond with contactlist
app.get("/contactlist", function(req, res){
	console.log('I recieved a get request');
	var contactlist = [
		person1 = {
			name: "Tim", 
			email: "Tim@email.com",
			number: "111"
		},
		person2 = {
			name: "emily", 
			email: "emily@email.com",
			number: "222"
		},
		person3 = {
			name: "John", 
			email: "John@email.com",
			number: "333"
		}
	];
	// Respond
	res.json(contactlist);
});

// set up local host on port
app.listen(3000);
console.log('server running from port 3000');