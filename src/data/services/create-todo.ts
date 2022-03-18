import { ApiTask } from "@/domain";
import { api } from "../api";

type NewTask = {
	title: string;
	author: string;
	description: string;
	boardIndex: number;
	boardRef: string;
	categories?: { categoryId: number }[];
};

export async function createTodo(task: NewTask) {
	const { data } = await api.post<ApiTask>("/todo", task);

	return data;
}
