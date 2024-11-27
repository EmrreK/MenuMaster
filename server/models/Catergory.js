const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
		unique: true,
	},
	categoryImage: {
		type: String,
		default: "/public/Images/defaultCategoryIcon.png",
	},
});

module.exports = mongoose.model("Category", CategorySchema);
