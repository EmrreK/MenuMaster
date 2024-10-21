import React from "react";

function BigFeature() {
	const features = [
		{
			name: "Push to deploy.",
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
			// icon: CloudArrowUpIcon,
		},
		{
			name: "SSL certificates.",
			description:
				"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
			// icon: LockClosedIcon,
		},
		{
			name: "Database backups.",
			description:
				"Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
			// icon: ServerIcon,
		},
	];

	return features.map((f) => (
		<div className="overflow-hidden bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					<div className="lg:pr-8 lg:pt-4">
						<div className="lg:max-w-lg">
							<h2 className="text-base font-semibold leading-7 text-indigo-600">
								Deploy faster
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								{f.name}
							</p>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								{f.description}
							</p>
						</div>
					</div>
					<img
						alt="Product screenshot"
						src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
						width={2432}
						height={1442}
						className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
					/>
				</div>
			</div>
		</div>
	));
}

export default BigFeature;
