import React, {useState} from "react";
import {Link} from "react-router-dom";

const Pricing = () => {
	const [isMonthly, setIsMonthly] = useState(true);

	const pricingPlans = [
		{
			title: "Intro",
			price: 19,
			description:
				"For most businesses that want to optimize web queries.",
		},
		{
			title: "Base",
			price: 39,
			description: "For businesses looking for essential features.",
		},
		{
			title: "Popular",
			price: 99,
			description: "For businesses that want advanced capabilities.",
		},
		{
			title: "Enterprise",
			price: 199,
			description:
				"For large organizations needing comprehensive solutions.",
		},
	];

	return (
		<section id="pricing" className="bg-white dark:bg-gray-800  mt-34">
			<div className="container bg-wh px-6 py-8 mx-auto">
				<div className="sm:flex flex-col sm:items-center justify-center">
					<div>
						<h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
							Simple, transparent pricing
						</h2>
					</div>

					<div className="overflow-hidden p-0.5 mt-6 border rounded-lg dark:border-gray-700">
						<div className="sm:-mx-0.5 flex">
							<button
								className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 text-white ${
									isMonthly
										? "bg-blue-500"
										: "bg-transparent text-gray-800 dark:text-gray-200"
								} rounded-lg`}
								onClick={() => setIsMonthly(true)}
							>
								Monthly
							</button>
							<button
								className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 ${
									!isMonthly
										? "bg-blue-500"
										: "bg-transparent text-gray-800 dark:text-gray-200"
								} rounded-lg`}
								onClick={() => setIsMonthly(false)}
							>
								Yearly
							</button>
						</div>
					</div>
				</div>

				<div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{pricingPlans.map((plan, index) => (
						<div
							key={index}
							className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
						>
							<p className="text-lg font-medium text-gray-800 dark:text-gray-100">
								{plan.title}
							</p>
							<h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
								${plan.price}{" "}
								<span className="text-base font-normal text-gray-600 dark:text-gray-400">
									/ Month
								</span>
							</h4>
							<p className="mt-4 text-gray-500 dark:text-gray-300">
								{plan.description}
							</p>

							<div className="mt-8 space-y-8">
								<FeatureItem feature="All limited links" />
								<FeatureItem feature="Own analytics platform" />
								<FeatureItem feature="Chat support" />
								<FeatureItem feature="Optimize hashtags" />
								<FeatureItem feature="Unlimited users" />
							</div>

							<Link to="/register">
								<button className="w-full btn btn-primary  px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform  rounded-md  focus:outline-none focus:bg-blue-600">
									Choose plan
								</button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const FeatureItem = ({feature}) => (
	<div className="flex items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-5 h-5 text-blue-500"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
		<span className="mx-4 text-gray-700 dark:text-gray-300">{feature}</span>
	</div>
);

export default Pricing;
