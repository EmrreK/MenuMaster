import React from "react";

function Hero() {
	return (
		<div>
			<div
				data-theme=""
				className="hero min-h-screen "
				style={{
					backgroundImage:
						"url(https://media.istockphoto.com/id/1177644546/photo/customer-scanning-qr-code-making-a-quick-and-easy-contactless-payment-with-her-smartphone-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=9DVidJv_DlCvsSYy90HY34b8nVS5o3LI9bI5jwgWqUg=)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center ">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
						<p className="mb-5">
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
