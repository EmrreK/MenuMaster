import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import BigFeature from "../Components/BigFeature";

function Homepage() {
	return (
		<div>
			<div>
				<Navbar />
				<Hero />
				<Features />
				<BigFeature />
			</div>
		</div>
	);
}

export default Homepage;
