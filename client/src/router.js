import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./Pages/homepage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/register",
		element: <Homepage />,
	},
	{
		path: "*",
		element: <Homepage />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
