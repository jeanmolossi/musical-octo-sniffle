import { ApiTask, ApiCategory, ApiComment } from "@/domain";
import { CardProps } from "@/presentation/components/card";
import { Variants } from "@/presentation/config";

export function todoFromColumn(column: string) {
	return (_todo: ApiTask): boolean => _todo.boardRef === column;
}

export function fromApiTaskToCardProps(todo: ApiTask): CardProps {
	return {
		...todo,
		id: todo.todoId,
		index: todo.boardIndex,
		createdAt: new Date().toLocaleDateString(),
		categories: todo.categories?.map(fromApiCategoryToCategory) || [],
		comments: todo.comments?.length || 0,
		lastComments: getPhotosFromComments(todo.comments),
	};
}

export function fromApiCategoryToCategory(category: ApiCategory) {
	return {
		type: category.categoryType as Variants,
		text: category.label,
	};
}

export function getPhotosFromComments(comments: ApiComment[] = []) {
	return comments.map(fromApiCommentToUserPhoto).filter(photosAfterLimit(3));
}

export function fromApiCommentToUserPhoto(comment: ApiComment) {
	return comment.userPhoto;
}

export function photosAfterLimit(limit: number) {
	return (_: any, index: number) => index < limit;
}

export function ascByIndex(a: CardProps, b: CardProps) {
	return a.index - b.index;
}
