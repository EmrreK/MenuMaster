import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/users/auth",
					{
						withCredentials: true,
					}
				);
				setUser(res.data.user || null);
			} catch (err) {
				console.error("Error checking auth:", err);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	const loginUser = (userData) => setUser(userData);
	const logoutUser = () => setUser(null);

	if (loading) {
		return;
	}

	return (
		<AuthContext.Provider value={{user, loginUser, logoutUser}}>
			{children}
		</AuthContext.Provider>
	);
};
