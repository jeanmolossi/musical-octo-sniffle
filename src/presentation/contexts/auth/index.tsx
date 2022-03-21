import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as requestLogin } from "@/data";
import { User } from "@/domain";
import { AuthContextProps, AuthProviderProps, StorageUser } from "./typings";

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [user, setUser] = useState<User>(() => {
		const _user = sessionStorage.getItem("user");
		if (_user) {
			return JSON.parse(_user) as User;
		}

		return null as any;
	});

	const login = useCallback(async (username: string, password: string) => {
		const storageUser = await requestLogin({ username, password });
		const _user = storageUserToUser(storageUser);

		sessionStorage.setItem("user", JSON.stringify(_user));
		setUser(_user);
	}, []);

	const logout = () => {
		sessionStorage.removeItem("user");
		setUser(null as any);
		navigate("/", { replace: true });
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

function storageUserToUser({ user, ...rest }: StorageUser): User {
	return {
		...rest,
		name: user,
	};
}
