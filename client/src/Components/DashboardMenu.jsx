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
	const [location, setLocation] = useState("");
	const [currency, setCurrency] = useState("USD");
	const [socials, setSocials] = useState({
		facebook: "",
		instagram: "",
		twitter: "",
	});
	const [languages, setLanguages] = useState(["English"]);
	const [banner, setBanner] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);

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
		handleShowAllProducts();
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

	const handleShowAllProducts = () => {
		setSelectedCategory(null);
		setShowForm("renderProduct");
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
							<label className="block text-gray-700">
								Product Category
							</label>
							<select
								value={newProduct.category || ""}
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										category: e.target.value,
									})
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							>
								<option value="" disabled>
									Select a category
								</option>
								{categories.map((category) => (
									<option
										key={category._id}
										value={category._id}
									>
										{category.name}
									</option>
								))}
							</select>
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

		if (editProduct && showForm === "editProduct") {
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
								className="w-full p-2 border border-grEditty-300 rounded-lg"
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
							<label className="block text-gray-700">
								Product Category
							</label>
							<select
								value={editProduct.category || ""}
								onChange={(e) =>
									setEditProduct({
										...editProduct,
										category: e.target.value,
									})
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							>
								<option value="" disabled>
									Select a category
								</option>
								{categories.map((category) => (
									<option
										key={category._id}
										value={category._id}
									>
										{category.name}
									</option>
								))}
							</select>
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

		if (editCategory && showForm === "editCategory") {
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

		if (showForm === "settings") {
			const handleBannerUpload = (e) => {
				const file = e.target.files[0];
				if (file) {
					setBanner(URL.createObjectURL(file));
				}
			};

			const handleProfilePictureUpload = (e) => {
				const file = e.target.files[0];
				if (file) {
					setProfilePicture(URL.createObjectURL(file));
				}
			};

			const handleSocialChange = (platform, value) => {
				setSocials({...socials, [platform]: value});
			};

			const handleLanguageAdd = (language) => {
				if (language && !languages.includes(language)) {
					setLanguages([...languages, language]);
				}
			};

			const handleLanguageRemove = (language) => {
				setLanguages(languages.filter((lang) => lang !== language));
			};

			return (
				<div className="p-6 flex justify-center items-center">
					<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl">
						<h2 className="text-2xl font-bold mb-6">
							Menu Page Settings
						</h2>

						{/* Location */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">Location</h3>
							<input
								type="text"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								placeholder="Enter your location"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>

						{/* Currency */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">Currency</h3>
							<select
								value={currency}
								onChange={(e) => setCurrency(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded-lg"
							>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="GBP">GBP</option>
								<option value="TRY">TRY</option>
								<option value="JPY">JPY</option>
							</select>
						</div>

						{/* Social Media Links */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">
								Social Media Links
							</h3>
							{["facebook", "instagram", "twitter"].map(
								(platform) => (
									<input
										key={platform}
										type="text"
										value={socials[platform]}
										onChange={(e) =>
											handleSocialChange(
												platform,
												e.target.value
											)
										}
										placeholder={`${
											platform.charAt(0).toUpperCase() +
											platform.slice(1)
										} URL`}
										className="w-full p-2 border border-gray-300 rounded-lg mb-2"
									/>
								)
							)}
						</div>

						{/* Languages */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">Languages</h3>
							<ul className="list-disc pl-5 mb-4">
								{languages.map((lang) => (
									<li
										key={lang}
										className="flex justify-between items-center mb-2"
									>
										<span>{lang}</span>
										<button
											onClick={() =>
												handleLanguageRemove(lang)
											}
											className="bg-red-500 text-white py-1 px-2 rounded-lg"
										>
											Remove
										</button>
									</li>
								))}
							</ul>
							<input
								type="text"
								placeholder="Add a language"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleLanguageAdd(e.target.value);
										e.target.value = "";
									}
								}}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>

						{/* Banner Upload */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">
								Upload Banner
							</h3>
							<input
								type="file"
								onChange={handleBannerUpload}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							{banner && (
								<img
									src={banner}
									alt="Banner Preview"
									className="w-full mt-4 rounded-lg"
								/>
							)}
						</div>

						{/* Profile Picture Upload */}
						<div className="mb-4">
							<h3 className="text-lg font-medium">
								Upload Profile Picture
							</h3>
							<input
								type="file"
								onChange={handleProfilePictureUpload}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							{profilePicture && (
								<img
									src={profilePicture}
									alt="Profile Preview"
									className="w-32 h-32 rounded-full mt-4 object-cover"
								/>
							)}
						</div>
					</div>
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
						<div className="flex justify-between items-center">
							<button
								className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
								onClick={() => {
									setEditProduct(product);
									setShowForm("editProduct");
								}}
							>
								Edit
							</button>
							<button
								className="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
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
							onClick={() => handleFormChange("settings")}
							className="w-full mb-4 py-2 px-4 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-200 sm:text-xs"
						>
							Settings
						</button>
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

						<button
							className="w-full p-2 text-center rounded-lg bg-gray-200 shadow hover:bg-gray-300 mb-2 font-bold"
							onClick={handleShowAllProducts}
						>
							All Products
						</button>

						<ul>
							{categories.map((category) => (
								<li
									key={category._id}
									className="mb-2 p-0 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-200"
								>
									<div className="flex justify-between items-center">
										<button
											className="w-full p-2 text-center rounded-lg"
											onClick={() => {
												handleCategoryClick(category);
												setShowForm("renderProduct");
											}}
										>
											{category.name}
										</button>
										<div className="flex">
											<button
												className="btn btn-xs btn-primary ml-2"
												onClick={() => {
													setEditCategory(category);
													setShowForm("editCategory");
												}}
											>
												Edit
											</button>
											<button
												className="btn btn-xs btn-error ml-2 mr-2"
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
						{showForm === "renderProduct" && renderProducts()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardMenu;
