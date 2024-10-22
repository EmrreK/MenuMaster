import React, {useState} from "react";

function Register() {
	const [isMonthly, setIsMonthly] = useState(false);

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
		<div>
			<section class="bg-gray-50 dark:bg-gray-900">
				<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create a MenuMaster account
							</h1>
							<form class="space-y-4 md:space-y-6" action="#">
								<div>
									<label
										for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								<div>
									<label
										for="password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<div>
									<label
										for="confirm-password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Confirm password
									</label>
									<input
										type="confirm-password"
										name="confirm-password"
										id="confirm-password"
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<div>
									<div className="flex justify-between items-center mb-2">
										<label
											for="plan"
											class="block  text-sm font-medium text-gray-900 dark:text-white"
										>
											Select a Plan
										</label>
										<div className="sm:-mx-0.5 flex ">
											<button
												className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 text-white ${
													isMonthly
														? "bg-blue-500"
														: "bg-transparent text-black dark:text-gray-200"
												} rounded-lg`}
												onClick={() =>
													setIsMonthly(true)
												}
											>
												Monthly
											</button>
											<button
												className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 text-white  ${
													!isMonthly
														? "bg-blue-500"
														: "bg-transparent text-black dark:text-gray-200"
												} rounded-lg`}
												onClick={() =>
													setIsMonthly(false)
												}
											>
												Annualy
											</button>
										</div>
									</div>

									<select
										id="plan"
										name="plan"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
									>
										{pricingPlans.map((plan) => (
											<option value={plan.title}>
												{plan.title} Plan
												{isMonthly
													? ` $${plan.price} / Month`
													: ` $${
															plan.price * 12 -
															plan.price
													  } / Year`}
											</option>
										))}
									</select>
								</div>
								<div class="flex items-start">
									<div class="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required=""
										/>
									</div>
									<div class="ml-3 text-sm">
										<label
											for="terms"
											class="font-light text-gray-500 dark:text-gray-300"
										>
											I accept the{" "}
											<a
												class="font-medium text-primary-600 hover:underline dark:text-primary-500"
												href=" "
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									class="w-full btn bg-primary text-white hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800"
								>
									Create an account
								</button>
								<p class="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<a
										href=" "
										class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Login here
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			/
		</div>
	);
}

export default Register;
