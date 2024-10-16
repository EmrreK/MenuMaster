const mongoose = require("mongoose");
const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const Table = require("../models/Table");
const User = require("../models/User");

// Connect to your MongoDB database
mongoose
	.connect("mongodb://localhost:27017/MenuMaster")
	.then(async () => {
		console.log("MongoDB connected");

		// Clear existing data if needed
		await Table.deleteMany({});
		await User.deleteMany({});

		// Seeding tables
		const fakeTables = [];
		for (let i = 1; i <= 50; i++) {
			fakeTables.push({
				tableNumber: i, // Table number 1 to 50
				qrCodeUrl: faker.number.int({min: 2, max: 8}),
			});
		}
		await Table.insertMany(fakeTables);
		console.log("50 fake tables created!");

		// Seeding users
		const fakeUsers = [];
		for (let i = 0; i < 20; i++) {
			// Assuming 20 users
			const hashedPassword = await bcrypt.hash("password123", 10);
			fakeUsers.push({
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: hashedPassword,
			});
		}
		await User.insertMany(fakeUsers);
		console.log("20 fake users created!");

		mongoose.connection.close();
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
