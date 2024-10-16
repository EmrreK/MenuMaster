const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/create", async (req, res) => {
	const {name, description, price, availability, category, image} = req.body;
	if (
		!name ||
		!description ||
		!price ||
		!availability ||
		!category ||
		!image
	) {
		return res.status(400).json({message: "All fields are required!"});
	}
	try {
		const item = MenuItem.findOne({name});
		if (item) {
			return res.status(400).json({
				message: "The item you are trying to create is already exists!",
			});
		}

		const newMenuItem = new MenuItem({
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
		res.status(500).send("Server error");
	}
});

router.get("/menuItems", async (req, res) => {
	try {
		const MenuItems = await MenuItem.find({});
		return res.json(MenuItems);
	} catch (error) {
		console.error(error);
		res.status(500).json({message: error.message});
	}
});

router.put("/menuItems/:id", async (req, res) => {
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

router.delete("/menuItems/:id", async (req, res) => {
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
