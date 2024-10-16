const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
	tableNumber: {
		type: String,
		default: "1",
		// required: true,
	},
	qrCodeUrl: {
		type: String,
		// required: true,
	},
	// isAvailable: {
	// 	type: Boolean,
	// 	default: true,
	// },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
