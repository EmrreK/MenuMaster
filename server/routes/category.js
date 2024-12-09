const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Middleware to check if the user is authenticated
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized"});
});

// Create a New Category
router.post("/", async (req, res) => {
	const {name} = req.body;
	const userId = req.user.userId;

	if (!name) {
		return res.status(400).json({message: "Category name is required!"});
	}

	try {
		// Check if the category already exists for the user
		const existingCategory = await Category.findOne({name, userId});
		if (existingCategory) {
			return res.status(400).json({message: "Category already exists!"});
		}

		const newCategory = new Category({userId, name});
		await newCategory.save();

		return res.status(201).json({
			message: "Category created successfully!",
			category: newCategory,
		});
	} catch (error) {
		console.error("Error creating category:", error);
		return res
			.status(500)
			.json({message: "Server error! Unable to create category."});
	}
});

// Get All Categories for the Authenticated User
router.get("/", async (req, res) => {
	const userId = req.user.userId;

	try {
		const categories = await Category.find({userId});
		return res.status(200).json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return res
			.status(500)
			.json({message: "Server error! Unable to fetch categories."});
	}
});

// Update a Category
router.put("/:id", async (req, res) => {
	const {id} = req.params;
	const {name} = req.body;
	const userId = req.user.userId;

	if (!name) {
		return res.status(400).json({message: "Category name is required!"});
	}

	try {
		const updatedCategory = await Category.findOneAndUpdate(
			{_id: id, userId},
			{name},
			{new: true, runValidators: true}
		);

		if (!updatedCategory) {
			return res.status(404).json({
				message: "Category not found or does not belong to the user!",
			});
		}

		return res.status(200).json({
			message: "Category updated successfully!",
			category: updatedCategory,
		});
	} catch (error) {
		console.error("Error updating category:", error);
		return res
			.status(400)
			.json({message: "Invalid update data or server error!"});
	}
});

// Delete a Category
router.delete("/:id", async (req, res) => {
	const {id} = req.params;
	const userId = req.user.userId;

	try {
		const deletedCategory = await Category.findOneAndDelete({
			_id: id,
			userId,
		});
		if (!deletedCategory) {
			return res.status(404).json({
				message: "Category not found or does not belong to the user!",
			});
		}

		return res
			.status(200)
			.json({message: "Category deleted successfully!"});
	} catch (error) {
		console.error("Error deleting category:", error);
		return res
			.status(500)
			.json({message: "Server error! Unable to delete category."});
	}
});

module.exports = router;
