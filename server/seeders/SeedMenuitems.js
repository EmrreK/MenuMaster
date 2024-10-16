const mongoose = require("mongoose");
const {faker} = require("@faker-js/faker");
const MenuItem = require("../models/MenuItem");

const {MONGO_URI} = process.env;

// Connect to your MongoDB database
mongoose
	.connect(MONGO_URI)
	.then(async () => {
		console.log("MongoDB connected");

		// Generate 100 fake food-related menu items
		const fakeMenuItems = [];
		const foodCategories = [
			"Appetizers",
			"Salads",
			"Main Courses",
			"Desserts",
			"Beverages",
			"Soups",
			"Sandwiches & Wraps",
			"Pizza & Pasta",
			"Seafood",
			"Vegan & Vegetarian",
		];

		for (let i = 0; i < 100; i++) {
			fakeMenuItems.push({
				name: faker.food.dish(),
				description: faker.commerce.productDescription(),
				price: parseFloat(faker.commerce.price(5, 50)),
				category:
					foodCategories[
						faker.number.int({
							min: 0,
							max: foodCategories.length - 1,
						})
					],
			});
		}

		await MenuItem.insertMany(fakeMenuItems);
		console.log("100 fake food menu items created!");

		mongoose.connection.close();
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
