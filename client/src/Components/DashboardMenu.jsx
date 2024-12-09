import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function DashboardMenu() {
	const [showForm, setShowForm] = useState(null);
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({});

	const fetchItems = async () => {
		try {
			const {data: categoriesData} = await axios.get("/api/category");
			console.log("Categories Data:", categoriesData);
			setCategories(categoriesData);
		} catch (err) {
			console.error("Failed to fetch categories:", err);
		}

		try {
			const {data: productsData} = await axios.get("/api/products");
			console.log("Products Data:", productsData);
			setProducts(productsData);
		} catch (err) {
			console.error("Failed to fetch products:", err);
		}
		console.log(newProduct);
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const handleCreateCategory = async (e) => {
		e.preventDefault();

		try {
			await axios.post("/api/category", {
				name: categoryName,
			});
			setCategoryName("");
			fetchItems();
		} catch (err) {
			console.error("Failed to create category:", err);
		}
		setShowForm(null);
	};

	const handleCreateProduct = async (e) => {
		e.preventDefault();

		if (
			!newProduct.name ||
			!newProduct.price ||
			!newProduct.category ||
			!newProduct.description
		) {
			console.error(
				"Failed to create product. Name, price, description, and category fields are required!"
			);
			alert("Failed to create product");
		}
		try {
			await axios.post("http://localhost:5000/api/product", {
				name: newProduct.name,
				price: newProduct.price,
				category: newProduct.category,
				description: newProduct.description,
				image: newProduct.image && newProduct.image,
			});
		} catch (err) {
			console.error("Failed creating product", err);
		}
		setShowForm(null);
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-11/12 lg:w-3/4 xl:w-2/3 bg-white shadow-lg rounded-lg p-6">
				<div className="flex mb-6">
					<div className="w-1/4 p-4">
						<Link
							to="/customerMenu"
							className="block w-full mb-4 py-2 px-4 text-center bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition duration-200 sm:text-xs"
						>
							Go to Menu
						</Link>
						<button
							onClick={() => setShowForm("category")}
							className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 sm:text-xs"
						>
							Create Category
						</button>
						<button
							onClick={() => setShowForm("product")}
							className="w-full mb-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200 sm:text-xs"
						>
							Create Product
						</button>
						<hr className="h-0.5 bg-gray-300 mb-4" />
						<p className="text-center mb-2 text-lg font-bold">
							Categories
						</p>
						<ul>
							{categories.map((category) => (
								<li
									key={category._id}
									className="mb-2 p-0 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-200"
								>
									<button className="w-full p-2 text-center rounded-lg">
										{category.name}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className="w-3/4 p-4">
						{showForm === "category" && (
							<div className="bg-white p-6 shadow-md rounded-lg">
								<h2 className="text-2xl font-bold mb-4">
									Create Category
								</h2>
								<form onSubmit={handleCreateCategory}>
									<div className="mb-4">
										<label className="block text-gray-700">
											Category Name
										</label>
										<input
											value={categoryName}
											onChange={(e) =>
												setCategoryName(e.target.value)
											}
											type="text"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>
									<button
										type="submit"
										className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
									>
										Submit
									</button>
								</form>
							</div>
						)}
						{showForm === "product" && (
							<div className="bg-white p-6 shadow-md rounded-lg">
								<h2 className="text-2xl font-bold mb-4">
									Create Product
								</h2>
								<form onSubmit={handleCreateProduct}>
									<div className="mb-4">
										<label className="block text-gray-700">
											Product Name
										</label>
										<input
											value={newProduct.name || ""}
											onChange={(e) => {
												setNewProduct({
													...newProduct,
													name: e.target.value,
												});
											}}
											type="text"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>

									<div className="mb-4">
										<label className="block text-gray-700">
											Product Price
										</label>
										<input
											value={newProduct.price || ""}
											onChange={(e) => {
												setNewProduct({
													...newProduct,
													price: e.target.value,
												});
											}}
											type="number"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>

									<div className="mb-4">
										<label className="block text-gray-700">
											Product Description
										</label>
										<textarea
											value={newProduct.description || ""}
											onChange={(e) => {
												setNewProduct({
													...newProduct,
													description: e.target.value,
												});
											}}
											className="w-full p-2 border border-gray-300 rounded-lg"
										></textarea>
									</div>

									<div className="mb-4">
										<label className="block text-gray-700">
											Product Image URL
										</label>
										<input
											value={newProduct.image || ""}
											onChange={(e) => {
												setNewProduct({
													...newProduct,
													image: e.target.value,
												});
											}}
											type="text"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>

									<div className="mb-4">
										<details className="dropdown">
											<summary className="btn">
												<p>
													{newProduct.category
														? newProduct.category
														: "Select a category"}
												</p>
											</summary>
											<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow ">
												{categories.map((category) => (
													<li key={category._id}>
														<button
															onClick={(e) => {
																e.preventDefault();
																setNewProduct({
																	...newProduct,
																	category:
																		category.name,
																});
															}}
															className="w-full p-2 text-center rounded-lg "
														>
															{category.name}
														</button>
													</li>
												))}
											</ul>
										</details>
									</div>

									<button
										type="submit"
										className="py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
									>
										Submit
									</button>
								</form>
							</div>
						)}
						{showForm === null && (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
								{products.map((product) => (
									<div
										key={product._id}
										className="bg-white p-4 shadow-md rounded-lg"
									>
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-40 object-cover mb-4 rounded-lg"
										/>
										<h3 className="text-lg font-bold mb-2">
											{product.name}
										</h3>
										<p>{product.description}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardMenu;
