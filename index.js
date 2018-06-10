var express = require ("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require ('mysql');

// DATABASE CONNECTION
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'holla123',
	database: 'Version2'
});

connection.connect (function (error){
	if (error){
		console.log ("Error in Database");
	}
	else{
		console.log ("Dsatabase Connected");
	}
});
//END

app.use (bodyparser.urlencoded({extended:true}));
app.use (express.static(__dirname + '/views'));
app.set ("view engine", "ejs");


app.get ("/", function (req, res){
	res.render ("Home");
});

app.get ("/TempHome", function(req, res){
	res.render ("TempHome");
});

app.get ("/Sign", function(req, res){
	res.render("Sign");
});

app.get ("/comparison", function(req, res){
	res.render ("comparison");
});
app.listen (3000, function (){
	console.log ("Server Started!!!");
});