import React from "react";
import axios from "axios";

function EditCategory({
	editCategory,
	setEditCategory,
	fetchItems,
	setShowForm,
}) {
	const handleEditCategory = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`/api/category/${editCategory._id}`, editCategory);
			fetchItems();
		} catch (err) {
			console.error("Failed to edit category", err);
		}
		setEditCategory(null);
		setShowForm("renderProduct");
	};

	return (
		<div className="bg-white p-6 shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Edit Category</h2>
			<form onSubmit={handleEditCategory}>
				<div className="mb-4">
					<label className="block text-gray-700">Category Name</label>
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
					<label className="block text-gray-700">
						Category Image URL
					</label>
					<input
						value={editCategory.image || ""}
						onChange={(e) =>
							setEditCategory({
								...editCategory,
								image: e.target.value,
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

export default EditCategory;
