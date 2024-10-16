const express = require("express");
const router = express.Router();
const Table = require("../models/Table");

router.post("/", async (req, res) => {
	try {
		const newTable = new Table(req.body);
		await newTable.save();
		res.status(201).json(newTable);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

router.get("/", async (req, res) => {
	try {
		const tables = await Table.find();
		res.status(200).json(tables);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedTable = await Table.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
		);
		if (!updatedTable) {
			return res.status(404).json({message: "Table not found"});
		}
		res.status(200).json(updatedTable);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedTable = await Table.findByIdAndDelete(req.params.id);
		if (!deletedTable) {
			return res.status(404).json({message: "Table not found"});
		}
		res.status(204).json();
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

module.exports = router;
