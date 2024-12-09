import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext";
import axios from "axios";

function Navbar({links}) {
	const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown menu
	const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State for user dropdown
	const {user, logoutUser} = useContext(AuthContext);

	// Toggle mobile menu
	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	// Close mobile menu
	const closeMenu = () => {
		setIsOpen(false);
	};

	// Toggle user dropdown
	const toggleUserDropdown = () => {
		setUserDropdownOpen((prev) => !prev);
	};

	// Handle logout
	const handleLogout = async () => {
		try {
			await axios.get("http://localhost:5000/api/users/logout", {
				withCredentials: true,
			});

			logoutUser();
			closeMenu();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div data-theme="dark" className="text-white fixed w-full z-10">
			<div className="navbar p-3">
				{/* Navbar Start */}
				<div className="navbar-start">
					<a
						href={user ? "/dashboard" : "/"}
						className="btn text-2xl"
					>
						MenuMaster
					</a>

					{/* Hamburger icon for mobile */}
					<div className="lg:hidden">
						<button
							onClick={toggleMenu}
							className="btn btn-ghost"
							aria-label="Toggle menu"
							aria-expanded={isOpen}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Navbar Center (Large Screens) */}
				<div className="navbar-center lg:flex hidden">
					<ul className="menu menu-horizontal">
						{(links
							? []
							: ["Home", "Features", "Demo", "Contact"]
						).map((item, index) => (
							<li className="mr-4" key={index}>
								<a
									href={`${
										links ? `/dashboard/` : "#"
									}${item.toLowerCase()}`}
									onClick={closeMenu}
								>
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* Navbar End */}
				<div className="navbar-end hidden lg:flex">
					{!user ? (
						<>
							<Link to="/login">
								<button className="btn mr-4 text-white">
									Login
								</button>
							</Link>
							<a href="/#pricing" className="btn btn-primary">
								Get Started
							</a>
						</>
					) : (
						<div className="relative">
							<button
								className="btn btn-ghost"
								onClick={toggleUserDropdown}
							>
								{user.companyName}
							</button>
							{userDropdownOpen && (
								<ul className="menu bg-gray-800 p-2 rounded shadow-md absolute right-0">
									<Link to="/dashboard">
										<li>
											<button>DashBoard</button>
										</li>
									</Link>

									<li>
										<button onClick={handleLogout}>
											Logout
										</button>
									</li>
								</ul>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{isOpen && (
				<div className="lg:hidden">
					<ul className="menu bg-gray-800 p-4">
						{(links
							? []
							: ["Home", "Features", "Demo", "Contact"]
						).map((item, index) => (
							<li className="mb-2" key={index}>
								<a
									href={`${
										links ? `/dashboard/` : "/#"
									}${item.toLowerCase()}`}
									onClick={closeMenu}
								>
									{item}
								</a>
							</li>
						))}
					</ul>

					{/* Mobile Buttons */}
					<div className="flex flex-col items-center mb-4">
						{!user ? (
							<>
								<a
									href="#pricing"
									className="btn  w-full mb-2 text-white mt-2"
									onClick={closeMenu}
								>
									Login
								</a>
								<a
									href="#pricing"
									className="btn btn-primary w-full"
									onClick={closeMenu}
								>
									Get Started
								</a>
							</>
						) : (
							<>
								<Link to="/dashboard" className="w-full">
									<button
										className="btn mr-4 text-white mb-2 w-full"
										onClick={closeMenu}
									>
										Dashboard
									</button>
								</Link>
								<button
									className="btn btn-primary w-full"
									onClick={handleLogout}
								>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
