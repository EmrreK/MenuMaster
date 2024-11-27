import React, {useState} from "react";
import {Link} from "react-router-dom";

function Menu() {
	const [categories, setCategories] = useState([
		"Electronics",
		"Books",
		"Clothing",
	]);
	const [products, setProducts] = useState([
		{
			name: "Laptop",
			image: "https://placehold.co/200x200?text=Laptop",
			description: "A high-end laptop",
		},
		{
			name: "Smartphone",
			image: "https://placehold.co/200x200?text=Smartphone",
			description: "A latest model smartphone",
		},
		{
			name: "Headphones",
			image: "https://placehold.co/200x200?text=Headphones",
			description: "Noise-cancelling headphones",
		},
		{
			name: "Novel",
			image: "https://placehold.co/200x200?text=Novel",
			description: "A best-selling novel",
		},
		{
			name: "T-shirt",
			image: "https://placehold.co/200x200?text=T-shirt",
			description: "A comfortable cotton t-shirt",
		},
		{
			name: "Jeans",
			image: "https://placehold.co/200x200?text=Jeans",
			description: "Stylish denim jeans",
		},
	]);
	const [showForm, setShowForm] = useState(null);

	const handleCreateCategory = () => {
		setShowForm("category");
	};

	const handleCreateProduct = () => {
		setShowForm("product");
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-11/12 lg:w-3/4 xl:w-2/3 bg-white shadow-lg rounded-lg p-6">
				<div className="flex mb-6">
					<div className="w-1/4 p-4">
						<Link
							to="menu"
							className="block w-full mb-4 py-2 px-4 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition duration-200"
						>
							Go to Menu
						</Link>
						<button
							onClick={handleCreateCategory}
							className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
						>
							Create Category
						</button>
						<button
							onClick={handleCreateProduct}
							className="w-full mb-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
						>
							Create Product
						</button>
						<ul>
							{categories.map((category, index) => (
								<li
									key={index}
									className="mb-2 p-2 bg-gray-200 rounded-lg shadow"
								>
									{category}
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
								<form>
									<div className="mb-4">
										<label className="block text-gray-700">
											Category Name
										</label>
										<input
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
								<form>
									<div className="mb-4">
										<label className="block text-gray-700">
											Product Name
										</label>
										<input
											type="text"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700">
											Product Image URL
										</label>
										<input
											type="text"
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700">
											Product Description
										</label>
										<textarea className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
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
								{products.map((product, index) => (
									<div
										key={index}
										className="bg-white p-4 shadow-md rounded-lg"
									>
										<img
											src={product.image}
											alt={`Image of ${product.name}`}
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

export default Menu;
