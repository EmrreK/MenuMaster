import React, {useState} from "react";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown menu

	// Function to toggle the dropdown menu
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div data-theme="dark" className="text-white fixed w-full z-10 ">
			<div className="navbar p-3 ">
				<div className="navbar-start">
					<a href="#home" className="btn text-2xl">
						MenuMaster
					</a>
					{/* Hamburger icon for mobile */}
					<div className="lg:hidden">
						<button onClick={toggleMenu} className="btn btn-ghost">
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
				{/* Navbar links for large screens only */}
				<div className="navbar-center lg:flex hidden">
					<ul className="menu menu-horizontal">
						<li className="mr-4">
							<a href="#home">Home</a>
						</li>
						<li className="mr-4">
							<a href="#features">Features</a>
						</li>
						<li className="mr-4">
							<a href=" ">Demo</a>
						</li>
						<li className="mr-4">
							<a href="#pricing">Pricing</a>
						</li>
						<li className="mr-4">
							<a href="#contact">Contact</a>
						</li>
					</ul>
				</div>
				{/* Buttons for large screens only */}
				<div className="navbar-end hidden lg:flex">
					<a href=" " className="btn mr-4 text-white">
						Login
					</a>
					<a href="#pricing" className="btn btn-primary">
						Get Started
					</a>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{isOpen && (
				<div className="lg:hidden">
					<ul className="menu bg-gray-800 p-4">
						<li className="mb-2">
							<a href="#home" onClick={toggleMenu}>
								Home
							</a>
						</li>
						<li className="mb-2">
							<a href="#features" onClick={toggleMenu}>
								Features
							</a>
						</li>
						<li className="mb-2">
							<a href=" " onClick={toggleMenu}>
								Demo
							</a>
						</li>
						<li className="mb-2">
							<a href="#pricing" onClick={toggleMenu}>
								Pricing
							</a>
						</li>
						<li className="mb-2">
							<a href="#contact" onClick={toggleMenu}>
								Contact
							</a>
						</li>
					</ul>

					{/* Stack Login and Get Started buttons for mobile */}
					<div className="flex flex-col items-center mb-4">
						<a
							href=" "
							className="btn mr-4 text-white mb-2 w-full"
							onClick={toggleMenu}
						>
							Login
						</a>
						<a
							href="#pricing"
							className="btn btn-primary w-full"
							onClick={toggleMenu}
						>
							Get Started
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
