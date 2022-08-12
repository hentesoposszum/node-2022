const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@tabor.dakzshp.mongodb.net/?retryWrites=true&w=majority`);

const Bejegyzes = require("./models/bejegyzes");

app.use(bodyParser.urlencoded());

// HTML, CSS, JS lekérése
app.use(express.static(__dirname + "/public"));

// Új bejegyzés
app.post("/bejegyzes", async function(req, res) {
	/*bejegyzesek.push({
		cim: req.body.cim,
		tartalom: req.body.tartalom
	});
	console.log(bejegyzesek);*/

	const bejegyzes = new Bejegyzes();
	bejegyzes.cim = req.body.cim;
	bejegyzes.tartalom = req.body.tartalom;
	await bejegyzes.save();

	res.send("Minden ok");
});

// Bejegyzések lekérése
app.get("/bejegyzesek", async function(req, res) {
	/*res.contentType("application/json")
	.send(JSON.stringify(bejegyzesek));*/

	const bejegyzesek = await Bejegyzes.find();
	res.contentType("application/json")
	.send(JSON.stringify(bejegyzesek));
});

app.listen(5000);