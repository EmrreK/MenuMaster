import React, {useState, useEffect} from "react";
import axios from "axios";

function CustomerMenu() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	// Fetch categories and products from API
	const fetchItems = async () => {
		try {
			const {data: categoriesData} = await axios.get("/api/category");
			setCategories(categoriesData);
		} catch (err) {
			console.error("Failed to fetch categories:", err);
		}

		try {
			const {data: productsData} = await axios.get("/api/menuitems");
			setProducts(productsData);
		} catch (err) {
			console.error("Failed to fetch products:", err);
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 flex-grow">
				{/* Header */}
				<div className="relative">
					<img
						alt="Bar background"
						className="w-full h-64 object-cover rounded-lg shadow-lg"
						height="300"
						src="https://storage.googleapis.com/a1aa/image/HWhSYMNNbI5IJNNlSU35mjCILqrobdtMI5s5uLcNXQAAVWAF.jpg"
						width="1200"
					/>
					<div className="absolute top-4 left-4">
						<img
							alt="Logo"
							className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
							height="100"
							src="https://storage.googleapis.com/a1aa/image/7Hfe3SlegpRbYIaziWHAev9Ccs6aUiDOhc1nf4buxPBihKLgC.jpg"
							width="100"
						/>
					</div>
					<div className="absolute top-4 right-4">
						<button className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center shadow-md hover:bg-gray-100">
							<i className="fas fa-globe mr-2"></i>
							EL
							<i className="fas fa-chevron-down ml-2"></i>
						</button>
					</div>
				</div>

				{/* Categories */}
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.length === 0 ? (
						<div className="col-span-full text-center py-8">
							<p className="text-lg text-gray-600">
								Loading categories...
							</p>
						</div>
					) : (
						categories.map((category) => (
							<div
								key={category._id}
								className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition transform hover:scale-105 hover:shadow-xl"
							>
								<div>
									<h2 className="text-2xl font-bold text-gray-800">
										{category.name}
									</h2>
									<p className="text-gray-500">
										{category.description}
									</p>
								</div>
								<img
									alt={`${category.name} image`}
									className="w-16 h-16 rounded-lg"
									height="50"
									src={category.imageUrl}
									width="50"
								/>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default CustomerMenu;
