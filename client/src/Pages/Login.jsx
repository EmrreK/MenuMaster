import React, {useContext, useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faM} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import {AuthContext} from "../Contexts/AuthContext";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {loginUser} = useContext(AuthContext);

	// Automatically focus the email field
	useEffect(() => {
		document.getElementById("email").focus();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}
		try {
			const res = await axios.post(
				"http://localhost:5000/api/users/login",
				{email, password},
				{withCredentials: true}
			);

			loginUser(res.data.user);
			navigate("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
			alert(error.response?.data?.message || "Login failed!");
		}
	};

	return (
		<>
			<Navbar />
			<div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
				<div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
					<div className="flex justify-center mt-4">
						<FontAwesomeIcon icon={faM} size="2x" />
					</div>
					<h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Sign in to your account
					</h2>

					<div className="mt-6">
						<form className="space-y-6" onSubmit={handleLogin}>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Email address
								</label>
								<input
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
								/>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<div className="text-sm">
										<a
											href="/forgot-password"
											className="font-semibold text-indigo-600 hover:text-indigo-500"
										>
											Forgot password?
										</a>
									</div>
								</div>
								<input
									onChange={(e) =>
										setPassword(e.target.value)
									}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
								/>
							</div>

							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</form>
					</div>
					<p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-400 text-center">
						Don't have an account?{" "}
						<a
							href="/register"
							className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
						>
							Register here
						</a>
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
