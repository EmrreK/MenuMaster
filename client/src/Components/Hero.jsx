import React from "react";

function Hero() {
	return (
		<div id="home">
			<div
				data-theme=""
				className="hero min-h-screen "
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center ">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">
							"Welcome to Effortless Dining!
						</h1>
						<p className="mb-5">
							Discover our menu with just a scan. Use your phone
							to explore our delicious offerings, all by scanning
							the QR code at your table. It’s quick, easy, and
							contactless. Ready to dive in? Check our plans out
							below."
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
