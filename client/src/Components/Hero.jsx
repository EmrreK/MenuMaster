import React from "react";

function Hero() {
	return (
		<div id="home">
			<div
				data-theme=""
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				}}
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#004d4d] to-[#003366] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
				/>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center ">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl fongradient-bold dark:text-white">
							"Welcome to Effortless Dining!
						</h1>
						<p className="mb-5 dark:text-white">
							Discover our menu with just a scan. Use your phone
							to explore our delicious offerings, all by scanning
							the QR code at your table. It’s quick, easy, and
							contactless. Ready to dive in? Check our plans out
							below."
						</p>
						<a href="#pricing">
							<button className="btn btn-primary">
								Get Started
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
