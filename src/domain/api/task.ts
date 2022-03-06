export type ApiTask = {
	todoId: number;
	title: string;
	description: string;
	boardIndex: number;
	boardRef: string;
	categories?: ApiCategory[];
	comments?: ApiComment[];
};

export type ApiComment = {
	commentId: number;
	userName: string;
	userPhoto: string;
	comment: string;
	createdAt: string;
	todoId: number;
};

export type ApiCategory = {
	categoryId: number;
	categoryType: string;
	label: string;
};
