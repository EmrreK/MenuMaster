import React from "react";

function Navbar() {
	return (
		<div className="bg-red-500">
			<div className="navbar bg-gray-800">
				<div className="navbar-start">
					<a className="btn  text-xl text-white">MenuMaster</a>
				</div>
				<div className="navbar-center lg:flex">
					<ul className="menu menu-horizontal">
						<li className="mr-6">
							<a className="text-white">Home</a>
						</li>
						<li className="mr-6">
							<a className="text-white">Demo</a>
						</li>
						<li className="mr-6">
							<a className="text-white">Contact</a>
						</li>
						<li>
							<a className="text-white">Pricing</a>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<a className="btn mr-2 text-white">Login</a>
					<a className="btn btn-primary">Register</a>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
