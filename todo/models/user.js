const mongoose = require("mongoose");

// séma létrehozása
// (milyen tulajdonságai vannak egy usernek)
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	tokens: {
		type: [String]
	}
});

module.exports = mongoose.model("User", userSchema);