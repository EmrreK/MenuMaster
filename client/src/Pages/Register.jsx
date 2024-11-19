import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";
import {usePlan} from "../Contexts/PlanContext";
import {useLocation} from "react-router-dom";

function Register() {
	const [isMonthly, setIsMonthly] = useState(false);

	const location = useLocation();
	const passedPlan = location.state?.selectedPlan || null;

	const {selectedPlan, setSelectedPlan} = usePlan();

	useEffect(() => {
		if (passedPlan) {
			setSelectedPlan(passedPlan);
		}
	}, [passedPlan, setSelectedPlan]);

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

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [companyName, setCompanyName] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		} else {
			try {
				await axios.post("http://localhost:5000/api/users/register", {
					email,
					password,
					plan: selectedPlan?.title,
					companyName,
				});
				navigate("/");
				alert("User registered successfully");
			} catch (error) {
				console.error(error);
				alert("Registration failed!");
			}
		}
	};

	return (
		<>
			<Navbar />

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
											for="companyName"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your Company Name
										</label>
										<input
											onChange={(e) => {
												setCompanyName(e.target.value);
											}}
											type="companyName"
											name="companyName"
											id="companyName"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Company Name"
											required=""
										/>
									</div>

									<div>
										<label
											for="email"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your email
										</label>
										<input
											onChange={(e) => {
												setEmail(e.target.value);
											}}
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
											onChange={(e) => {
												setPassword(e.target.value);
											}}
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
											onChange={(e) => {
												setConfirmPassword(
													e.target.value
												);
											}}
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
													type="button"
													className={`hover:bg-blue-600 btn hover:text-white focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 dark:text-white   ${
														isMonthly
															? "bg-blue-600 text-white"
															: "bg-transparent  dark:text-gray-200"
													} rounded-lg`}
													onClick={() =>
														setIsMonthly(true)
													}
												>
													Monthly
												</button>
												<button
													type="button"
													className={`hover:bg-blue-600 hover:text-white  btn focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 dark:text-white  ${
														!isMonthly
															? "bg-blue-600 text-white"
															: "bg-transparent  dark:text-gray-200 "
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
											value={selectedPlan?.title || ""}
											onChange={(e) => {
												const selectedPlanTitle =
													e.target.value;
												const selectedPlanObj =
													pricingPlans.find(
														(p) =>
															p.title ===
															selectedPlanTitle
													);
												setSelectedPlan(
													selectedPlanObj
												);
											}}
											id="plan"
											name="plan"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required
										>
											{pricingPlans.map((pricingPlan) => (
												<option
													key={pricingPlan.title}
													value={pricingPlan.title}
												>
													{pricingPlan.title} Plan
													{isMonthly
														? ` $${pricingPlan.price} / Month`
														: ` $${
																pricingPlan.price *
																	12 -
																pricingPlan.price
														  } / Year`}
												</option>
											))}
										</select>
									</div>
									{/* <div class="flex items-start">
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
									</div> */}
									<button
										onClick={handleRegister}
										type="button"
										class="w-full btn bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-400 dark:focus:ring-primary-800"
									>
										Create an account
									</button>
									<p class="text-sm font-light text-gray-500 dark:text-gray-400">
										Already have an account?{" "}
										<Link to="/login">
											<a
												href=" "
												class="font-medium text-primary-600 hover:underline dark:text-primary-500"
											>
												Login here
											</a>
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export default Register;
