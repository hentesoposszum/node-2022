/*
EXPRESS

*/

const express = require("express");

const app = express();

app.use(function(req, res, next) {
	console.log("kérés érkezett");
	next();
});

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res) {
	res.status(404).end("404");
});

app.listen(5000);

/*const http = require("http");
const fs = require("fs");

const server = http.createServer(function(req, res) {
	fs.readFile(__dirname + "/public" + req.url, function(err, data) {
		if (err) {
			res.statusCode = 404;
			res.end("404");
		} else {
			res.end(data);
		}
	});
});

server.listen(5000);*/