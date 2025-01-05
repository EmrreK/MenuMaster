import React from "react";
import {useState} from "react";
import axios from "axios";

function CreateProduct({categories, fetchItems, setShowForm}) {
	const [newProduct, setNewProduct] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const handleCreateProduct = async (e) => {
		e.preventDefault();

		if (!newProduct.name || !newProduct.price || !newProduct.category) {
			setErrorMessage("Name, price, and category fields are required");
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
		setShowForm("renderProduct");
	};

	return (
		<div className="bg-white p-6 shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Create Product</h2>
			<form onSubmit={handleCreateProduct}>
				<div className="mb-4">
					<label className="block text-gray-700">Product Name</label>
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
					<label className="block text-gray-700">Product Price</label>
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
							<option key={category._id} value={category._id}>
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
				{errorMessage && (
					<p className="text-red-500 mt-2">{errorMessage}</p>
				)}
			</form>
		</div>
	);
}

export default CreateProduct;
