export type ApiTask = {
	todoId: number;
	title: string;
	description: string;
	boardIndex: number;
	boardRef: string;
	categories?: ApiTaskCategory[];
	comments?: ApiTaksComment[];
};

export type ApiTaksComment = {
	commentId: number;
	userName: string;
	userPhoto: string;
	comment: string;
	createdAt: string;
	todoId: number;
};

export type ApiTaskCategory = {
	categoryId: number;
	categoryType: string;
	label: string;
};
