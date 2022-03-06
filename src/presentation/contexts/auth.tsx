import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@/@types/user";

interface AuthContextProps {
	user: User;
	login: (username: string, password: string) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children?: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [user, setUser] = useState<User>(() => {
		const _user = sessionStorage.getItem("user");
		if (_user) {
			return JSON.parse(_user);
		}

		return null;
	});

	const login = (username: string, password: string) => {
		let auth = false;
		["1", "2", "3"].forEach((id) => {
			const sessionUser = sessionStorage.getItem("@fake-user/" + id);
			if (sessionUser) {
				const _user: User = JSON.parse(sessionUser);
				if (_user.username === username && _user.pass === password) {
					sessionStorage.setItem("user", JSON.stringify(_user));
					setUser(_user);
					auth = true;
					return;
				}
			}
		});

		if (!auth) throw new Error("Credenciais invalidas");
	};

	const logout = () => {
		sessionStorage.removeItem("user");
		setUser(null as any);
	};

	useEffect(() => {
		if (!user && pathname !== "/") {
			navigate("/", { replace: true });
		} else if (!!user === (pathname === "/")) {
			navigate("/home", { replace: true });
		}
	}, [user, pathname]);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
