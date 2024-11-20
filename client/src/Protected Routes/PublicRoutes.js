import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext";

const PublicRoutes = ({children}) => {
	const {user} = useContext(AuthContext);

	if (user) {
		return <Navigate to="/dashboard" />;
	}

	return children;
};

export default PublicRoutes;
