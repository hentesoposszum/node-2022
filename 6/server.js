const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());

// HTML, CSS, JS lekérése
app.use(express.static(__dirname + "/public"));

const bejegyzesek = [];

// Új bejegyzés
app.post("/bejegyzes", function(req, res) {
	bejegyzesek.push({
		cim: req.body.cim,
		tartalom: req.body.tartalom
	});

	console.log(bejegyzesek);

	res.send("Minden ok");
});

// Bejegyzések lekérése
app.get("/bejegyzesek", function(req, res) {	
	res.contentType("application/json")
	.send(JSON.stringify(bejegyzesek));
});

app.listen(5000);