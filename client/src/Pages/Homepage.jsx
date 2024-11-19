import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import BigFeature from "../Components/BigFeature";
import ContactUs from "../Components/ContactUs";
import Pricing from "../Components/Pricing";
import Footer from "../Components/Footer";
import {PlanProvider} from "../Contexts/PlanContext";

function Homepage() {
	return (
		<div>
			<div>
				<Navbar />
				<Hero />
				<Features />
				<BigFeature />
				<PlanProvider>
					<Pricing />
				</PlanProvider>
				<ContactUs />
				<Footer />
			</div>
		</div>
	);
}

export default Homepage;
