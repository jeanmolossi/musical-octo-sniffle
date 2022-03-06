import { useCallback, useEffect, useRef, useState } from "react";
import { ApiCategory } from "@/domain";
import { NewTaskModalProps } from ".";
import { loadCategories } from "@/data/services/load-categories";
import { createTodo } from "@/data/services/create-todo";

interface Categories extends ApiCategory {
	selected?: boolean;
}

export function useNewTaskModalBehaviors({
	onDone,
	onClose,
}: Partial<NewTaskModalProps>) {
	const [categories, setCategories] = useState<Categories[]>([]);

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const onToggleCategory = useCallback(
		(categoryId: number) => () => {
			const _categories = categories.map((category) => {
				if (category.categoryId === categoryId) {
					category.selected = !category.selected;
				}
				return category;
			});
			setCategories(_categories);
		},
		[categories]
	);

	const newCard = useCallback(
		async (biggerBoardIndex: number, boardColumn: string) => {
			if (!titleRef.current || !descriptionRef.current) return;

			try {
				await createTodo({
					title: titleRef.current.value,
					description: descriptionRef.current.value,
					boardIndex: biggerBoardIndex,
					boardRef: boardColumn,
					categories: categories
						.filter((category) => category.selected)
						.map(({ categoryId }) => ({ categoryId })),
				});
			} catch (error: any) {
				alert(error.response?.data.error || error.message);
			}
		},
		[categories, onClose]
	);

	const localOnDone = useCallback(async () => {
		await onDone?.(newCard);
		onClose?.();
	}, [onDone, newCard]);

	useEffect(() => {
		loadCategories().then(setCategories);
	}, []);

	return {
		localOnDone,
		titleRef,
		descriptionRef,
		categories,
		onToggleCategory,
	};
}
