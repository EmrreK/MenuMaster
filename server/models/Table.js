const mongoose = require("mongoose");
const QRCode = require("qrcode");

const tableSchema = new mongoose.Schema({
	tableNumber: {
		type: Number,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model("Table", tableSchema);
