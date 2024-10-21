import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import BigFeature from "../Components/BigFeature";
import ContactUs from "../Components/ContactUs";

function Homepage() {
	return (
		<div>
			<div>
				<Navbar />
				<Hero />
				<Features />
				<BigFeature />
				<ContactUs />
			</div>
		</div>
	);
}

export default Homepage;
