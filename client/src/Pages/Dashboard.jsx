import React from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";

function Dashboard() {
	return (
		<div>
			<Navbar links={["Menu", "Customize", "Settings"]} />
			<div className="pt-20">
				<Menu />
			</div>
		</div>
	);
}

export default Dashboard;
