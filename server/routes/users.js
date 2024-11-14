const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

router.post("/register", async (req, res) => {
	const {companyName, email, password} = req.body;

	if (!companyName || !email || !password) {
		return res.status(400).json({message: "All fields are required"});
	}

	try {
		const user = await User.findOne({$or: [{companyName}, {email}]});
		if (user) {
			return res.status(400).json({message: "User already exists"});
		}

		const newUser = new User({companyName, email, password});

		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);

		await newUser.save();

		return res.json({message: "User registered successfully"});
	} catch (error) {
		console.error("register error", error);
		res.status(500).send("Server Error");
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			return res.status(400).json({message: info.message});
		}
		req.logIn(user, (err) => {
			if (err) throw err;

			return res.json({message: "Logged in successfully"});
		});
	})(req, res, next);
});

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) return next(err);
		req.session.destroy(() => {
			res.clearCookie("connect.sid");
			res.json({message: "Logged out successfully"});
		});
	});
});

router.get("/auth", (req, res) => {
	console.log("Session:", req.session); // Logs session data
	console.log("User:", req.user); // Logs authenticated user object

	if (req.isAuthenticated()) {
		return res.json({user: req.user});
	} else {
		return res.status(401).json({message: "Not logged in"});
	}
});

module.exports = router;
