import { useCallback, useEffect, useRef, useState } from "react";
import { ApiCategory } from "@/domain";
import { loadCategories, createTodo } from "@/data";
import { NewTaskModalProps } from "./";
import { useAuth } from "@/presentation/contexts";

interface Categories extends ApiCategory {
	selected?: boolean;
}

export function useNewTaskModalBehaviors({
	onDone,
	onClose,
}: Partial<NewTaskModalProps>) {
	const { user } = useAuth();

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
					author: user.name,
					description: descriptionRef.current.value,
					boardIndex: biggerBoardIndex,
					boardRef: boardColumn,
					categories: categories
						.filter((category) => category.selected)
						.map(({ categoryId, categoryType, label }) => ({
							categoryId,
							categoryType,
							label,
						})),
				});
			} catch (error: any) {
				alert(error.response?.data.error || error.message);
			}

			onClose?.();
		},
		[categories, onClose, user.name]
	);

	const localOnDone = useCallback(
		async () => onDone?.(newCard),
		[onDone, newCard]
	);

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
