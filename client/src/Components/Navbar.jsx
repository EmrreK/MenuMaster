import React from "react";

function Navbar() {
	return (
		<div data-theme="dark" className="text-white">
			<div className="navbar p-3 ">
				<div className="navbar-start">
					<a className="btn  text-2xl">MenuMaster</a>
				</div>
				<div className="navbar-center lg:flex">
					<ul className="menu menu-horizontal">
						<li className="mr-6 ">
							<a>Home</a>
						</li>
						<li className="mr-6 ">
							<a>Demo</a>
						</li>
						<li className="mr-6 ">
							<a>Contact</a>
						</li>
						<li className="">
							<a>Pricing</a>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<a className="btn mr-4 text-white">Login</a>
					<a className="btn btn-primary ">Register</a>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
