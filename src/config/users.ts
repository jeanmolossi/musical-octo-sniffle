import users from "./users.json";

interface User {
	id: string;
	user: string;
	username: string;
	pass: string;
	photo?: string;
}

const userKey = "@fake-user/";

function create(user: User) {
	sessionStorage.setItem(userKey + user.id, JSON.stringify(user));
}

function createFakerUsers() {
	// tslint:disable-next-line: no-console
	console.log("Criando usuários...");
	users.forEach(create);
	// tslint:disable-next-line: no-console
	console.log("Usuários criados com sucesso!");
}

createFakerUsers();
