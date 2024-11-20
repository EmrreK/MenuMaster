import React from "react";
import Navbar from "../Components/Navbar";
import {Outlet} from "react-router-dom";

function Dashboard() {
	return (
		<div>
			{/* <Navbar links={["Menu", "Customize", "Settings"]} /> */}
			<Outlet />
		</div>
	);
}

export default Dashboard;
