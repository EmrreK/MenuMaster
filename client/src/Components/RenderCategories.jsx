import React from "react";
import axios from "axios";

function RenderCategories({
	setShowForm,
	categories,
	setEditCategory,
	setSelectedCategory,
	fetchItems,
}) {
	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
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

	return (
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
									handleDeleteCategory(category._id)
								}
							>
								Delete
							</button>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}

export default RenderCategories;
