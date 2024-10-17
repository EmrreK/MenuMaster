const express = require("express");
const router = express.Router();
const Table = require("../models/Table");
const QRCode = require("qrcode");
const path = require("path");

router.post("/", async (req, res) => {
	try {
		// Create a new table entry from the request body
		const newTable = new Table(req.body);

		// Save the table to the database first
		await newTable.save();

		// Menu page in the front end (using the table number)
		const tableUrl = `http://localhost:3000/menu/${newTable.tableNumber}`;

		// Define the file path for saving the QR code image
		const filePath = path.join(
			__dirname,
			`../../client/public/qrcodes/table-${newTable.tableNumber}.png`
		);

		// Generate and save the QR code as a PNG file
		QRCode.toFile(filePath, tableUrl, function (err) {
			if (err) {
				return res
					.status(500)
					.json({message: "Failed to generate QR code"});
			}

			// Respond with a success message and the newly created table
			res.status(201).json({
				message: "Table created successfully",
				newTable,
				qrCodePath: `/qrcodes/table-${newTable.tableNumber}.png`, // Optionally return the QR code path
			});
		});
	} catch (error) {
		// Handle any errors during table creation or QR code generation
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
