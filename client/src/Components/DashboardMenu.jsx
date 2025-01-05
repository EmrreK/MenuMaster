import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Settings from "./Settings";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import EditCategory from "./EditCategory";
import RenderProducts from "./RenderProducts";
import RenderCategories from "./RenderCategories";

function DashboardMenu() {
	const [showForm, setShowForm] = useState(null);
	const [categories, setCategories] = useState([]);
	const [editProduct, setEditProduct] = useState(null);
	const [products, setProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [editCategory, setEditCategory] = useState(null);

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
				<CreateCategory
					fetchItems={fetchItems}
					setShowForm={setShowForm}
				/>
			);
		}

		if (showForm === "product") {
			return (
				<CreateProduct
					fetchItems={fetchItems}
					categories={categories}
					setShowForm={setShowForm}
				/>
			);
		}

		if (editProduct && showForm === "editProduct") {
			return (
				<EditProduct
					fetchItems={fetchItems}
					setShowForm={setShowForm}
					categories={categories}
					editProduct={editProduct}
					setEditProduct={setEditProduct}
				/>
			);
		}

		if (editCategory && showForm === "editCategory") {
			return (
				<EditCategory
					fetchItems={fetchItems}
					editCategory={editCategory}
					setEditCategory={setEditCategory}
					setShowForm={setShowForm}
				/>
			);
		}

		if (showForm === "settings") {
			return <Settings setShowForm={setShowForm} />;
		}

		return null;
	};

	const renderProducts = () => {
		return (
			<RenderProducts
				products={products}
				selectedCategory={selectedCategory}
				setEditProduct={setEditProduct}
				setShowForm={setShowForm}
				fetchItems={fetchItems}
			/>
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

						<RenderCategories
							fetchItems={fetchItems}
							setShowForm={setShowForm}
							categories={categories}
							setEditCategory={setEditCategory}
							setSelectedCategory={setSelectedCategory}
						/>
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
