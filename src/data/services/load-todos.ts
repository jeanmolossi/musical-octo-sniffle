import { ApiTask } from "@/domain";
import { api } from "../api";

export async function loadTodos(): Promise<ApiTask[]> {
	const { data } = await api.get<ApiTask[]>("/todo");
	return data;
}
