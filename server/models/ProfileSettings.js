const mongoose = require("mongoose");

const profileSettingsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	location: {
		type: String,
		default: "",
	},
	currency: {
		type: String,
		default: "Currency",
	},
	instagramURL: {
		type: String,
		default: "",
	},
	twitterURL: {
		type: String,
		default: "",
	},
	facebookURL: {
		type: String,
		default: "",
	},
	banner: {
		type: String,
		default: "/images/defaultBanner.jpg",
	},
	profilePicture: {
		type: String,
		default: "/images/defaultProfile.jpg",
	},
});

module.exports = mongoose.model("ProfileSettings", profileSettingsSchema);
