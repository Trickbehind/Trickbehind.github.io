var express = require ("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require ('mysql');

// DATABASE CONNECTION
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Ts@9849493088',
	database: 'Version2'
});

var l1 = [{name: "xxxx"}], l2 = [{name: "xxxx"}];
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
	res.render ("comparison", {l1: l1, l2: l2});
});



app.post ("/comparison", function(req, res){
	var c1 = req.body.college1, c2 = req.body.college2;
	var data = "select * from college where name = ? ";
	var r1= [], r2 = [];
	connection.query(data, [c1], function(err, result, fields){
		if (err){
			console.log("error in data base college 1");
		}else{
				r1 = result;
				connection.query(data, [c2], function(err, result, fields){
						if (err){
							console.log("error in data base college 2");
					}else{
							r2 = result;
							console.log (r1[0].name);
							console.log (r2);
							res.render ("comparison", {l1: r1, l2: r2});
					}
				});
			}
	});
	

	
});







app.listen (3000, function (){
	console.log ("Server Started!!!");
});