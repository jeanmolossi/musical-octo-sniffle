import { StorageUser } from "@/presentation/contexts";

type Credentials = { username: string; password: string };

export async function login(credentials: Credentials) {
	const { username, password } = credentials;

	return new Promise<StorageUser>((resolve, reject) => {
		["1", "2", "3"].forEach((id) => {
			const sessionUser = sessionStorage.getItem("@fake-user/" + id);

			if (sessionUser) {
				const _user: StorageUser = JSON.parse(sessionUser);

				if (_user.username === username && _user.pass === password) {
					resolve(_user);
					return;
				}
			}
		});

		reject(new Error("Invalid credentials"));
	});
}
