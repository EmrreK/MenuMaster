import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";

function Homepage() {
	return (
		<div>
			<div>
				<Navbar />
				<Hero />
				<Features />
			</div>
		</div>
	);
}

export default Homepage;
