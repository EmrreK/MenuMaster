import React, {useState} from "react";
import axios from "axios";

function CreateCategory({fetchItems, setShowForm}) {
	const [categoryName, setCategoryName] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleCreateCategory = async (e) => {
		e.preventDefault();

		if (categoryName === "") {
			setErrorMessage("Category name is required");
			return;
		}

		try {
			await axios.post("/api/category", {
				name: categoryName,
				image: categoryImage,
			});
			setCategoryName("");
			fetchItems();
			setShowForm("renderProduct");
		} catch (err) {
			console.error("Failed to create category:", err);
			setErrorMessage("Failed to create category");
		}
	};

	return (
		<div className="bg-white p-6 shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Create Category</h2>
			<form onSubmit={handleCreateCategory}>
				<div className="mb-4">
					<label className="block text-gray-700">Category Name</label>
					<input
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						type="text"
						className="w-full p-2 border border-gray-300 rounded-lg"
					/>
					<label className="block text-gray-700">
						Category Image URL
					</label>
					<input
						value={categoryImage}
						onChange={(e) => setCategoryImage(e.target.value)}
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
				{errorMessage && (
					<p className="text-red-500 mt-2">{errorMessage}</p>
				)}
			</form>
		</div>
	);
}

export default CreateCategory;
