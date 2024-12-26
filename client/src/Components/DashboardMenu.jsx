import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function DashboardMenu() {
	const [showForm, setShowForm] = useState(null);
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({});
	const [editProduct, setEditProduct] = useState(null);
	const [editCategory, setEditCategory] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

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

	const handleCreateCategory = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/category", {name: categoryName});
			setCategoryName("");
			fetchItems();
		} catch (err) {
			console.error("Failed to create category:", err);
		}
		setShowForm(null);
	};

	const handleCreateProduct = async (e) => {
		e.preventDefault();
		console.log("Creating product:", newProduct);
		if (
			!newProduct.name ||
			!newProduct.price ||
			!newProduct.category ||
			!newProduct.description
		) {
			alert("Failed to create product");
			console.log("Missing fields:", newProduct);
			return;
		}
		try {
			await axios.post("/api/menuitems", newProduct);
			console.log("Product created successfully");
			setNewProduct({});
			fetchItems();
		} catch (err) {
			console.error("Failed creating product", err);
		}
		setShowForm(null);
	};

	const handleEditProduct = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`/api/menuitems/${editProduct._id}`, editProduct);
			fetchItems();
		} catch (err) {
			console.error("Failed to edit product", err);
		}
		setEditProduct(null);
		setShowForm(null);
	};

	const handleDeleteProduct = async (productId) => {
		try {
			await axios.delete(`/api/menuitems/${productId}`);
			fetchItems();
		} catch (err) {
			console.error("Failed to delete product", err);
		}
	};

	const handleEditCategory = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`/api/category/${editCategory._id}`, editCategory);
			fetchItems();
		} catch (err) {
			console.error("Failed to edit category", err);
		}
		setEditCategory(null);
		setShowForm(null);
	};

	const handleDeleteCategory = async (categoryId) => {
		try {
			await axios.delete(`/api/category/${categoryId}`);
			fetchItems();
		} catch (err) {
			console.error("Failed to delete category", err);
		}
	};

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		setShowForm(null);
	};

	const handleFormChange = (formType) => {
		setShowForm(formType);
		setEditCategory(null);
		setEditProduct(null);
	};

	const renderForm = () => {
		if (showForm === "category") {
			return (
				<div className="bg-white p-6 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold mb-4">Create Category</h2>
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
			);
		}

		if (showForm === "product") {
			return (
				<div className="bg-white p-6 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold mb-4">Create Product</h2>
					<form onSubmit={handleCreateProduct}>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Name
							</label>
							<input
								value={newProduct.name || ""}
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										name: e.target.value,
									})
								}
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
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										price: e.target.value,
									})
								}
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
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										description: e.target.value,
									})
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							></textarea>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Image URL
							</label>
							<input
								value={newProduct.image || ""}
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										image: e.target.value,
									})
								}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<div className="mb-4">
							<details className="dropdown">
								<summary className="btn">
									<p>
										{newProduct.category
											? categories.find(
													(category) =>
														category._id ===
														newProduct.category
											  )?.name
											: "Select a category"}
									</p>
								</summary>
								<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
									{categories.map((category) => (
										<li key={category._id}>
											<button
												onClick={(e) => {
													e.preventDefault();
													setNewProduct({
														...newProduct,
														category: category._id,
													});
												}}
												className="w-full p-2 text-center rounded-lg"
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
			);
		}

		if (editProduct) {
			return (
				<div className="bg-white p-6 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold mb-4">Edit Product</h2>
					<form onSubmit={handleEditProduct}>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Name
							</label>
							<input
								value={editProduct.name || ""}
								onChange={(e) =>
									setEditProduct({
										...editProduct,
										name: e.target.value,
									})
								}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Price
							</label>
							<input
								value={editProduct.price || ""}
								onChange={(e) =>
									setEditProduct({
										...editProduct,
										price: e.target.value,
									})
								}
								type="number"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Description
							</label>
							<textarea
								value={editProduct.description || ""}
								onChange={(e) =>
									setEditProduct({
										...editProduct,
										description: e.target.value,
									})
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							></textarea>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Product Image URL
							</label>
							<input
								value={editProduct.image || ""}
								onChange={(e) =>
									setEditProduct({
										...editProduct,
										image: e.target.value,
									})
								}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<div className="mb-4">
							<details className="dropdown">
								<summary className="btn">
									<p>
										{editProduct.category
											? editProduct.category
											: "Select a category"}
									</p>
								</summary>
								<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
									{categories.map((category) => (
										<li key={category._id}>
											<button
												onClick={(e) => {
													e.preventDefault();
													setEditProduct({
														...editProduct,
														category: category._id,
													});
												}}
												className="w-full p-2 text-center rounded-lg"
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
			);
		}

		if (editCategory) {
			return (
				<div className="bg-white p-6 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold mb-4">Edit Category</h2>
					<form onSubmit={handleEditCategory}>
						<div className="mb-4">
							<label className="block text-gray-700">
								Category Name
							</label>
							<input
								value={editCategory.name || ""}
								onChange={(e) =>
									setEditCategory({
										...editCategory,
										name: e.target.value,
									})
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
			);
		}

		return null;
	};

	const renderProducts = () => {
		const filteredProducts = selectedCategory
			? products.filter(
					(product) => product.category === selectedCategory._id
			  )
			: products;

		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{filteredProducts.map((product) => (
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
						<div className="flex justify-between items-center mt-4">
							<button
								className="btn btn-primary"
								onClick={() => setEditProduct(product)}
							>
								Edit
							</button>
							<button
								className="btn btn-error"
								onClick={() => handleDeleteProduct(product._id)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		);
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
							onClick={() => handleFormChange("category")}
							className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 sm:text-xs"
						>
							Create Category
						</button>
						<button
							onClick={() => handleFormChange("product")}
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
									<div className="flex justify-between items-center">
										<button
											className="w-full p-2 text-center rounded-lg"
											onClick={() =>
												handleCategoryClick(category)
											}
										>
											{category.name}
										</button>
										<div className="flex">
											<button
												className="btn btn-xs btn-primary ml-2"
												onClick={() => {
													setEditCategory(category);
													setShowForm(null);
												}}
											>
												Edit
											</button>
											<button
												className="btn btn-xs btn-error ml-2"
												onClick={() =>
													handleDeleteCategory(
														category._id
													)
												}
											>
												Delete
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className="w-3/4 p-4">
						{renderForm()}
						{showForm === null && renderProducts()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardMenu;
