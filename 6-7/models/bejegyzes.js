const mongoose = require("mongoose");

const bejegyzesSema = new mongoose.Schema({
	cim: {
		type: String,
		required: true
	},
	tartalom: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Bejegyze", bejegyzesSema);