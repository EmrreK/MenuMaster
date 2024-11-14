import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const checkAuthStatus = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/users/auth",
				{withCredentials: true}
			);
			console.log("000");
			setIsAuthenticated(response.status === 200);
		} catch (error) {
			setIsAuthenticated(false);
			console.log("111");
		}
	};

	useEffect(() => {
		checkAuthStatus();
	}, []);

	return (
		<AuthContext.Provider value={{isAuthenticated, checkAuthStatus}}>
			{children}
		</AuthContext.Provider>
	);
};
