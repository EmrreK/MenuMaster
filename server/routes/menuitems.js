const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized"});
});

router.post("/", async (req, res) => {
	const {name, description, price, availability, category, image} = req.body;
	const userId = req.user.userId;

	if (!name || !description || !price || !category) {
		return res.status(400).json({message: "All fields are required!"});
	}

	try {
		const item = await MenuItem.findOne({name, userId});
		if (item) {
			return res.status(400).json({
				message:
					"The item you are trying to create already exists for this Menu!",
			});
		}

		const newMenuItem = new MenuItem({
			userId,
			name,
			description,
			price,
			availability,
			category,
			image,
		});

		await newMenuItem.save();
		return res.json({message: "Menu item created successfully!"});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: error.message});
	}
});

router.get("/", async (req, res) => {
	const userId = req.user.userId;

	try {
		const menuItems = await MenuItem.find({userId});
		return res.json(menuItems);
	} catch (error) {
		console.error(error);
		res.status(500).json({message: error.message});
	}
});

router.put("/:id", async (req, res) => {
	const {id} = req.params;
	const {name, description, price, availability, category, image} = req.body;
	const userId = req.user.userId;

	try {
		const updatedItem = await MenuItem.findOneAndUpdate(
			{_id: id, userId},
			{name, description, price, availability, category, image},
			{new: true, runValidators: true}
		);

		if (!updatedItem) {
			return res.status(404).json({
				message: "Menu item not found or does not belong to the user!",
			});
		} else {
			return res.json(updatedItem);
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({message: "Invalid update data"});
	}
});

router.delete("/:id", async (req, res) => {
	const {id} = req.params;
	const userId = req.user.userId;

	try {
		const deletedItem = await MenuItem.findOneAndDelete({_id: id, userId});
		if (!deletedItem) {
			return res.status(404).json({
				message: "Menu item not found or does not belong to the user!",
			});
		} else {
			return res.json({message: "Menu item deleted successfully!"});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({message: "Server error!"});
	}
});

module.exports = router;
