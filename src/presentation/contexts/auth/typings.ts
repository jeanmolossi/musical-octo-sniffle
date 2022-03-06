import { User } from "@/domain";

export type StorageUser = {
	id: number;
	user: string;
	username: string;
	pass?: string;
	photo?: string;
};

export interface AuthContextProps {
	user: User;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export interface AuthProviderProps {
	children?: React.ReactNode;
}
