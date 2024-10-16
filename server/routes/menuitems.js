const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Create Menu Item
router.post("/", async (req, res) => {
	const {name, description, price, availability, category, image} = req.body;

	if (!name || !description || !price || !category) {
		return res.status(400).json({message: "All fields are required!"});
	}

	try {
		// Correct way to find an existing item
		const item = await MenuItem.findOne({name}); // Use an object to search
		if (item) {
			return res.status(400).json({
				message: "The item you are trying to create already exists!",
			});
		}

		const newMenuItem = new MenuItem({
			name,
			description,
			price,
			availability, // Ensure this is handled correctly in your schema
			category,
			image,
		});

		await newMenuItem.save();
		return res.json({message: "Menu item created successfully!"});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: error.message}); // Send the error message
	}
});

// Get all Menu Items
router.get("/", async (req, res) => {
	try {
		const menuItems = await MenuItem.find({});
		return res.json(menuItems);
	} catch (error) {
		console.error(error);
		res.status(500).json({message: error.message});
	}
});

// Update Menu Item
router.put("/:id", async (req, res) => {
	const {id} = req.params;
	const {name, description, price, availability, category, image} = req.body;

	try {
		const updatedItem = await MenuItem.findByIdAndUpdate(
			id,
			{name, description, price, availability, category, image},
			{new: true, runValidators: true}
		);

		if (!updatedItem) {
			return res.status(404).json({message: "Menu item not found!"});
		} else {
			return res.json(updatedItem);
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({message: "Invalid update data"});
	}
});

// Delete Menu Item
router.delete("/:id", async (req, res) => {
	const {id} = req.params;

	try {
		const deletedItem = await MenuItem.findByIdAndDelete(id);
		if (!deletedItem) {
			return res.status(404).json({message: "Menu item not found!"});
		} else {
			return res.json({message: "Menu item deleted successfully!"});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({message: "Server error!"});
	}
});

module.exports = router;
