const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Middleware to check if the user is authenticated
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized"});
});

// Create Menu Item
router.post("/", async (req, res) => {
	const {name, description, price, availability, category, image} = req.body;
	const userId = req.user.userId;

	// Validate required fields
	if (!name || !description || !price || !category) {
		return res.status(400).json({
			message: "Name, description, price, and category are required!",
		});
	}

	try {
		// Check if the menu item already exists for the user
		const existingItem = await MenuItem.findOne({name, userId});
		if (existingItem) {
			return res.status(400).json({
				message:
					"The item you are trying to create already exists for this menu!",
			});
		}

		// Create a new menu item
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
		console.log(newMenuItem);
		return res.status(201).json({
			message: "Menu item created successfully!",
			menuItem: newMenuItem,
		});
	} catch (error) {
		console.error("Error creating menu item:", error);
		return res
			.status(500)
			.json({message: "Server error! Unable to create menu item."});
	}
});

// Get All Menu Items for the Authenticated User
router.get("/", async (req, res) => {
	const userId = req.user.userId;

	try {
		const menuItems = await MenuItem.find({userId});
		return res.status(200).json(menuItems);
	} catch (error) {
		console.error("Error fetching menu items:", error);
		res.status(500).json({
			message: "Server error! Unable to fetch menu items.",
		});
	}
});

// Update Menu Item
router.put("/:id", async (req, res) => {
	const {id} = req.params;
	const {name, description, price, availability, category, image} = req.body;
	const userId = req.user.userId;

	try {
		// Find and update the menu item belonging to the user
		const updatedItem = await MenuItem.findOneAndUpdate(
			{_id: id, userId},
			{name, description, price, availability, category, image},
			{new: true, runValidators: true}
		);

		if (!updatedItem) {
			return res.status(404).json({
				message: "Menu item not found or does not belong to the user!",
			});
		}

		return res.status(200).json({
			message: "Menu item updated successfully!",
			menuItem: updatedItem,
		});
	} catch (error) {
		console.error("Error updating menu item:", error);
		return res
			.status(400)
			.json({message: "Invalid update data or server error!"});
	}
});

// Delete Menu Item
router.delete("/:id", async (req, res) => {
	const {id} = req.params;
	const userId = req.user.userId;

	try {
		// Find and delete the menu item belonging to the user
		const deletedItem = await MenuItem.findOneAndDelete({_id: id, userId});
		if (!deletedItem) {
			return res.status(404).json({
				message: "Menu item not found or does not belong to the user!",
			});
		}

		return res
			.status(200)
			.json({message: "Menu item deleted successfully!"});
	} catch (error) {
		console.error("Error deleting menu item:", error);
		res.status(500).json({
			message: "Server error! Unable to delete menu item.",
		});
	}
});

module.exports = router;
