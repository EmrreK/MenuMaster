const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true, // Ensure category names are unique per user
	},

	image: {
		type: String,
		default: "/images/defaultMenuIcon.png",
		required: false,
	},
});

module.exports = mongoose.model("Category", categorySchema);
