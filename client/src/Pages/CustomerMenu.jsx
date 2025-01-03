import React, {useState, useEffect} from "react";
import axios from "axios";
import {set} from "mongoose";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function CustomerMenu() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [showForm, setShowForm] = useState("categories");
	const [selectedCategory, setSelectedCategory] = useState("");

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

	if (showForm === "products") {
		const filteredProducts = products.filter(
			(product) => product.category === selectedCategory
		);

		return (
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 flex-grow">
					<div className="relative">
						<img
							alt="Bar background"
							className="w-128 h-64 object-cover rounded-lg shadow-lg"
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
				</div>

				<div className="bg-gray-100 min-h-screen flex flex-col">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 flex-grow">
						<button
							onClick={() => setShowForm("categories")}
							className=" text-black px-4 py-2 rounded-full mb-4 flex items-center justify-center"
						>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className="mt-4"
							/>
						</button>
						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
							{filteredProducts.map((product) => (
								<div
									key={product._id}
									className="bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105"
								>
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-40 object-cover mb-4 rounded-lg"
									/>
									<div className="flex justify-between items-center mb-2">
										<h3 className="text-lg font-bold">
											{product.name}
										</h3>
										<h3 className="text-lg font-bold text-black underline">
											${product.price}
										</h3>
									</div>
									<p className="text-gray-700 mb-4 line-clamp-2">
										{product.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (showForm === "categories") {
		return (
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 flex-grow">
					{/* Header */}
					<div className="relative">
						<img
							alt="Bar background"
							className="w-128 h-64 object-cover rounded-lg shadow-lg"
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
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
						{categories.length === 0 ? (
							<div className="col-span-full text-center py-8">
								<p className="text-lg text-gray-600">
									Loading categories...
								</p>
							</div>
						) : (
							categories.map((category) => (
								<div
									onClick={() => {
										setSelectedCategory(category._id);
										setShowForm("products");
									}}
									key={category._id}
									className="bg-white  rounded-lg shadow-lg flex items-center justify-between transition transform hover:scale-105 hover:shadow-xl"
								>
									<div>
										<h2 className="text-2xl p-6 font-bold text-gray-800 underline">
											{category.name}
										</h2>
									</div>
									<img
										alt={`${category.name} image`}
										height="50"
										src={category.image}
										width="50"
										className="ml-4 rounded-lg shadow-lg object-cover w-36 h-36 bg-gray-200 p-1 shadow-md  rounded-lg"
									/>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default CustomerMenu;
