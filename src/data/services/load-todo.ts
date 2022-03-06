import { ApiTask } from "@/domain";
import { api } from "../api";

export async function loadTodo(todoId: number): Promise<ApiTask> {
	const { data } = await api.get(`/todo/${todoId}`);
	return data;
}
