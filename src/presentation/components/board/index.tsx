import React, { useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { HiCheckCircle, HiPlusCircle } from "react-icons/hi";
import { api } from "@/data/api";
import { RenderIf } from "@/helpers/render-if";
import { useModal } from "@/helpers/use-modal";
import { ApiTask } from "@/presentation/pages/home";
import { Button } from "@/presentation/components/button";
import { Card, CardProps } from "@/presentation/components/card";
import { Input } from "@/presentation/components/input";
import { Modal } from "@/presentation/components/modal";
import styles from "./styles.module.scss";

interface ApiCategories {
	categoryId: number;
	label: string;
	categoryType:
		| "neutral"
		| "success"
		| "warning"
		| "danger"
		| "info"
		| "highlight";
}

interface Categories extends ApiCategories {
	selected?: boolean;
}
interface BoardProps {
	title: string;
	droppableId: string;
	cards: CardProps[];
}

export const Board = ({ cards, title, droppableId }: BoardProps) => {
	const [isOpen, onOpen, onClose] = useModal();
	const [categories, setCategories] = useState<Categories[]>([]);

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const loadCategories = async () => {
		const { data: _categories } = await api.get("/categories");
		setCategories(_categories);
	};

	const onToggleCategory = (categoryId: number) => () => {
		const _categories = categories.map((category) => {
			if (category.categoryId === categoryId) {
				category.selected = !category.selected;
			}
			return category;
		});
		setCategories(_categories);
	};

	const newCard = async () => {
		if (!titleRef.current || !descriptionRef.current) return;

		try {
			await api.post<ApiTask>("/todo", {
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				boardIndex: cards.reduce(
					(acc, card, i) => Math.max(acc, card.index, i) + 1,
					0
				),
				boardRef: droppableId,
				categories: categories
					.filter((category) => category.selected)
					.map(({ categoryId }) => ({ categoryId })),
			});
		} catch (error: any) {
			alert(error.response?.data.error || error.message);
		}

		onClose();
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<div className={styles.boardContainer}>
			<h2>
				{title}
				<Button variant="highlight" onClick={onOpen}>
					<HiPlusCircle />
				</Button>
			</h2>

			<Droppable droppableId={droppableId}>
				{(provided, snapshot) => (
					<div
						style={{ minHeight: 500 }}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{cards.map((card, index) => (
							<Card
								key={card.id}
								{...card}
								isDragging={snapshot.isDraggingOver}
								index={index}
							/>
						))}

						{provided.placeholder}
					</div>
				)}
			</Droppable>

			<Modal isOpen={isOpen} onClose={onClose} onDone={newCard}>
				<h2>New task - {title}</h2>

				<Input
					ref={titleRef}
					label="Todo Title"
					placeholder="Ex.: Finish backend learning"
				/>

				<Input
					ref={descriptionRef}
					label="Todo Description"
					placeholder="Ex.: Finish backend learning"
				/>

				<div>
					<label>Select todo categories</label>
					<br />
					{categories.map(
						({ categoryId, label, categoryType, selected }) => (
							<Button
								onClick={onToggleCategory(categoryId)}
								variant={categoryType}
								key={categoryId}
							>
								{RenderIf(!!selected, <HiCheckCircle />)}
								{label}
							</Button>
						)
					)}
				</div>
			</Modal>
		</div>
	);
};
