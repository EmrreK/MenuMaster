import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import {PlanProvider} from "./Contexts/PlanContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/register",
		element: (
			<PlanProvider>
				<Register />
			</PlanProvider>
		),
	},
	{
		path: "*",
		element: <Homepage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
