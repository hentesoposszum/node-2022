// C#-os megfelelő using http;
const http = require("http");
const fs = require("fs");

const server = http.createServer(function(request, response) {
	switch (request.url) {
		case "/":
			fs.readFile("public/kezdolap.html", function(error, data) {
				if (error) {
					console.log(error);

					response.statusCode = 500;
					response.end("Szerver hiba");
				} else {
					response.end(data);
				}
			});
			break;
		
		case "/login":
			fs.readFile("public/login.html", function(error, data) {
				if (error) {
					console.log(error);

					response.statusCode = 500;
					response.end("Szerver hiba");
				} else {
					response.end(data);
				}
			});
			break;
	
		default:
			response.statusCode = 404;
			response.end("404");
			break;
	}
});

server.listen(5000);