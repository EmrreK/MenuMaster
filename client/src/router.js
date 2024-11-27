import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import {PlanProvider} from "./Contexts/PlanContext";
import Dashboard from "./Pages/Dashboard";
import PublicRoutes from "./Protected Routes/PublicRoutes"; // If you still need a public route
import AdminRoutes from "./Protected Routes/AdminRoutes"; // Your new protected route
import Menu from "./Components/Menu";

// Define the router
const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PublicRoutes>
				<PlanProvider>
					<Homepage />
				</PlanProvider>
			</PublicRoutes>
		),
	},
	{
		path: "/register",
		element: (
			<PublicRoutes>
				<PlanProvider>
					<Register />
				</PlanProvider>
			</PublicRoutes>
		),
	},
	{
		path: "/login",
		element: (
			<PublicRoutes>
				<Login />
			</PublicRoutes>
		),
	},
	{
		path: "/dashboard",
		element: (
			<AdminRoutes>
				<Dashboard />
			</AdminRoutes>
		),
		children: [
			{
				path: "menu",
				element: <Menu />,
			},
		],
	},
	{
		path: "*",
		element: (
			<PublicRoutes>
				<PlanProvider>
					<Homepage />
				</PlanProvider>
			</PublicRoutes>
		),
	},
]);

// The main Router component
const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
