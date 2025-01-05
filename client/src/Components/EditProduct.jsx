import {React} from "react";
import axios from "axios";

function EditProduct({
	setShowForm,
	fetchItems,
	categories,
	editProduct,
	setEditProduct,
}) {
	const handleEditProduct = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`/api/menuitems/${editProduct._id}`, editProduct);
			fetchItems();
		} catch (err) {
			console.error("Failed to edit product", err);
		}
		setEditProduct(null);
		setShowForm("renderProduct");
	};

	return (
		<div className="bg-white p-6 shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Edit Product</h2>
			<form onSubmit={handleEditProduct}>
				<div className="mb-4">
					<label className="block text-gray-700">Product Name</label>
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
					<label className="block text-gray-700">Product Price</label>
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
			</form>
		</div>
	);
}

export default EditProduct;
