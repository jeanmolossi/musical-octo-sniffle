import { api } from "../api";

export async function moveTodo(
	todoId: number,
	toIndex: number,
	toBoardRef: string
): Promise<void> {
	await api.put(`/todo/${todoId}`, {
		boardIndex: toIndex,
		boardRef: toBoardRef,
	});
}
