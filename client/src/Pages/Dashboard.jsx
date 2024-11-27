import React from "react";
import Navbar from "../Components/Navbar";
import DashboardMenu from "../Components/DashboardMenu";

function Dashboard() {
	return (
		<div>
			<Navbar links={["Menu", "Customize", "Settings"]} />
			<div className="pt-20">
				<DashboardMenu />
			</div>
		</div>
	);
}

export default Dashboard;
