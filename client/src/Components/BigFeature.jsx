import React from "react";

function BigFeature() {
	const features = [
		{
			name: "Interactive Menu Display",
			description:
				"Showcase a beautiful, interactive menu on your website. With Menubly, you can easily update menu items and prices in real time, ensuring your customers always see the latest offerings.",
			image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NhbiUyMHFyfGVufDB8fDB8fHww",
		},
		{
			name: "Easy Setup",
			description:
				"Create a custom website for your cafe or restaurant in seconds. No coding needed! Personalize it with your brand’s colors, logo, and menu. Your site will be ready to showcase your business in no time.",
			image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NhbiUyMHFyfGVufDB8fDB8fHww",
		},
	];

	return (
		<div className="overflow-hidden bg-stone-100 py-6 ">
			<div className="mx-auto max-w-6xl px-6 lg:px-8">
				{features.map((feature, index) => (
					<div
						key={index}
						className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center`}
					>
						{/* Alternating order of image and text */}
						{index % 2 === 0 ? (
							<>
								{/* Image on the left */}
								<img
									src={feature.image}
									alt={feature.name}
									className="w-4/6 h-4/6 object-cover  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
								/>
								{/* Text on the right */}
								<div className="lg:pr-8 lg:pt-4">
									<div className="lg:max-w-lg">
										<h2 className="text-base font-semibold leading-7 text-indigo-600">
											Deploy faster
										</h2>
										<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
											{feature.name}
										</p>
										<p className="mt-6 text-lg leading-8 text-gray-600">
											{feature.description}
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								{/* Text on the left */}
								<div className="lg:pr-8 lg:pt-4">
									<div className="lg:max-w-lg">
										<h2 className="text-base font-semibold leading-7 text-indigo-600">
											Deploy faster
										</h2>
										<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
											{feature.name}
										</p>
										<p className="mt-6 text-lg leading-8 text-gray-600">
											{feature.description}
										</p>
									</div>
								</div>
								{/* Image on the right */}
								<img
									src={feature.image}
									alt={feature.name}
									className="w-4/6 h-4/6 object-cover  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
								/>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default BigFeature;
