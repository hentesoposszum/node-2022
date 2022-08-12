const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	done: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Todo", todoSchema);