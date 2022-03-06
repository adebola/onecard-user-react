import { createContext, useState } from 'react';
import UserServices from '../services/UserServices';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(UserServices.isLoggedIn());

	const [authId, setAuthId] = useState(
		localStorage.getItem('id') ? localStorage.getItem('id') : null
	);
	const [type, setType] = useState(
		localStorage.getItem('type') ? localStorage.getItem('id') : null
	);
	return (
		<AuthContext.Provider
			value={{ auth, setAuth, authId, type, setType, setAuthId }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
