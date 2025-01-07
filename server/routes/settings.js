const express = require("express");
const router = express.Router();
const ProfileSettings = require("../models/ProfileSettings");
const multer = require("multer");
const path = require("path");

// Middleware to check if the user is authenticated
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized"});
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Save files in the "uploads" directory
		const uploadPath = path.join(
			__dirname,
			"../../client/public/images/uploads"
		);
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		// Save the file with a unique name (timestamp + original extension)
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({storage});

// Fetch Profile Settings
router.get("/", async (req, res) => {
	const userId = req.user._id;

	try {
		// Find the user's profile settings by userId
		const settings = await ProfileSettings.findOne({userId});
		if (!settings) {
			return res.status(404).json({message: "Settings not found!"});
		}
		return res.status(200).json(settings);
	} catch (error) {
		console.error("Error fetching settings:", error);
		return res.status(500).json({message: "Server error!"});
	}
});

// Update Profile Settings
router.put(
	"/",
	upload.fields([{name: "banner"}, {name: "profilePicture"}]),
	async (req, res) => {
		const userId = req.user._id;
		const {location, currency, instagramURL, twitterURL, facebookURL} =
			req.body;

		try {
			// Log uploaded files for debugging
			console.log("Uploaded Files:", req.files);

			// Check if the settings exist for the user
			let settings = await ProfileSettings.findOne({userId});
			if (!settings) {
				return res.status(404).json({message: "Settings not found!"});
			}

			// Update the settings with provided values
			settings.location = location || settings.location;
			settings.currency = currency || settings.currency;
			settings.instagramURL = instagramURL || settings.instagramURL;
			settings.twitterURL = twitterURL || settings.twitterURL;
			settings.facebookURL = facebookURL || settings.facebookURL;

			// If files are uploaded, update their paths in the settings
			if (req.files.banner) {
				settings.banner = `/images/uploads/${path.basename(
					req.files.banner[0].path
				)}`;
			}
			if (req.files.profilePicture) {
				settings.profilePicture = `/images/uploads/${path.basename(
					req.files.profilePicture[0].path
				)}`;
			}

			// Save the updated settings to the database
			await settings.save();
			return res.status(200).json({
				message: "Settings updated successfully!",
				settings,
			});
		} catch (error) {
			console.error("Error updating settings:", error);
			return res.status(500).json({message: "Server error!"});
		}
	}
);

module.exports = router;
