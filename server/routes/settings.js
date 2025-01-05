const express = require("express");
const router = express.Router();
const profileSettings = require("../models/profileSettings");

// Middleware to check if the user is authenticated
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized"});
});

router.put("/", async (req, res) => {
	const userId = req.user.userId;
	const {
		location,
		currency,
		instagramURL,
		twitterURL,
		facebookURL,
		banner,
		profilePicture,
	} = req.body;

	try {
		const settings = await profileSettings.findOne({userId});
		if (!settings) {
			return res.status(404).json({message: "Settings not found!"});
		}

		settings.location = location;
		settings.currency = currency;
		settings.instagramURL = instagramURL;
		settings.twitterURL = twitterURL;
		settings.facebookURL = facebookURL;
		settings.banner = banner;
		settings.profilePicture = profilePicture;

		await settings.save();
		return res.status(200).json({
			message: "Settings updated successfully!",
			settings,
		});
	} catch (error) {
		console.error("Error updating settings:", error);
		return res.status(500).json({message: "Server error!"});
	}
});

module.exports = router;
