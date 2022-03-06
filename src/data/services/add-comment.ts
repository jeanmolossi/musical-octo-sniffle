import { api } from "../api";

type AddCommentParam = {
	todoId: number;
	comment: string;
	userName: string;
	userPhoto?: string;
};

export async function addComment({ todoId, ...comment }: AddCommentParam) {
	const { userPhoto } = comment;

	if (!userPhoto) {
		comment.userPhoto = "https://randomuser.me/api/portraits/lego/1.jpg";
	}

	const { data } = await api.post(`/todo/${todoId}/comment`, comment);
	return data;
}
