import React from "react";
import axios from "axios";

function RenderProducts({
	products,
	selectedCategory,
	setEditProduct,
	setShowForm,
	fetchItems,
}) {
	const handleDeleteProduct = async (productId) => {
		try {
			await axios.delete(`/api/menuitems/${productId}`);
			fetchItems();
		} catch (err) {
			console.error("Failed to delete product", err);
		}
	};

	const filteredProducts = selectedCategory
		? products.filter(
				(product) => product.category === selectedCategory._id
		  )
		: products;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
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
				))
			) : (
				<p className="text-red-500 mt-4 text-center underline col-span-3">
					There are no products to display in this category
				</p>
			)}
		</div>
	);
}

export default RenderProducts;
