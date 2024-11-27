import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext";

const AdminRoutes = ({children}) => {
	const {user} = useContext(AuthContext);

	console.log(user);

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (!children) {
		return <Outlet />;
	}

	return children;
};

export default AdminRoutes;
