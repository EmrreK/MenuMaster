const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
	tableNumber: {
		type: String,
		unique: true,
		required: true,
	},
	qrCodeUrl: {
		type: String,
		required: true,
	},
	// isAvailable: {
	// 	type: Boolean,
	// 	default: true,
	// },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
