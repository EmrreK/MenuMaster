const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	description: {
		type: String,
	},

	price: {
		type: Number,
		required: true,
	},

	availability: {
		type: Boolean,
		default: true,
	},

	category: {
		type: String,
		required: true,
	},

	image: {
		type: Image,
		required: false,
		default: "/public/Images/defaultMenuIcon.png",
	},
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
