import React from "react";

function Navbar() {
	return (
		<div data-theme="dark" className="text-white fixed w-full z-10">
			<div className="navbar p-3 ">
				<div className="navbar-start">
					<a href=" " className="btn  text-2xl">
						MenuMaster
					</a>
				</div>
				<div className="navbar-center lg:flex">
					<ul className="menu menu-horizontal">
						<li className="mr-6 ">
							<a href=" ">Home</a>
						</li>
						<li className="mr-6 ">
							<a href=" ">Demo</a>
						</li>
						<li className="mr-6 ">
							<a href=" ">Contact</a>
						</li>
						<li className="">
							<a href=" ">Pricing</a>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<a href=" " className="btn mr-4 text-white">
						Login
					</a>
					<a href=" " className="btn btn-primary ">
						Register
					</a>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
