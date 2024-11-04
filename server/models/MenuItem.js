const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

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
		type: String,
		default: "/public/Images/defaultMenuIcon.png",
	},
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
