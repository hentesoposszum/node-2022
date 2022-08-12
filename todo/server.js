const express = require("express");
const app = express();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@tabor.dakzshp.mongodb.net/todo?retryWrites=true&w=majority`);

const Todo = require("./models/todo");

app.use(express.urlencoded());
app.use(express.json());

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

app.listen(5000);