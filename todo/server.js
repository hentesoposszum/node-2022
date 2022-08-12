const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@tabor.dakzshp.mongodb.net/todo?retryWrites=true&w=majority`);

const bcrypt = require("bcrypt"); // jelszóhoz
const crypto = require("crypto"); // session tokenhez

const Todo = require("./models/todo");
const User = require("./models/user");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.get("/teendok", async function(req, res) {
	const todos = await Todo.find();

	res.contentType("application/json").send(JSON.stringify(todos));
});

app.post("/teendo", async function(req, res) {
	const todo = new Todo();
	todo.text = req.body.text;
	await todo.save();

	res.send("Minden ok");
});

app.post("/felhasznalo", async function(req, res) {
	const user = new User();
	user.username = req.body.username;
	
	// Jelszó hashelés
	const hash = await bcrypt.hash(req.body.password, 10);
	user.password = hash;

	await user.save();

	res.send("Felhasználó létrehozva");
});

app.post("/login", async function(req, res) {
	const user = await User.findOne({
		username: req.body.username
	});

	if (user) {
		// akkor fut le, ha van felhasználó
		const passwCorrect = await bcrypt.compare(req.body.password, user.password);

		if (!passwCorrect) {
			res.status(403).send("Rossz jelszó");
			return;
		}

		// csak akkor fut le, ha jó jelszó
		const token = crypto.randomUUID();
		user.tokens.push(token);
		await user.save();

		res.cookie("session", token).send("Sikeres login");
	} else {
		res.status(404).send("Nincs ilyen felhasználó");
	}
});

async function loginOnlyMiddleware(req, res, next) {
	const token = req.cookies.session;

	if (!token) {
		res.status(403).send("Nem vagy bejelentkezve");
		return;
	}

	// akkor fut le, ha van token
	
	const user = await User.findOne({
		tokens: token
	});

	if (user) {
		req.user = user;
		next();
	} else {
		res.status(403).send("Rossz token");
	}
}

app.get("/secret", loginOnlyMiddleware, function(req, res) {
	res.send("be vagy jelentkezve");
});

app.listen(5000);