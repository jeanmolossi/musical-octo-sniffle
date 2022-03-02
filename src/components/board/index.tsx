import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardProps } from "../card";
import styles from "./styles.module.scss";

interface BoardProps {
	title: string;
	droppableId: string;
	cards: CardProps[];
}

export const Board = ({ cards, title, droppableId }: BoardProps) => {
	return (
		<div className={styles.boardContainer}>
			<h2>{title}</h2>

			<Droppable droppableId={droppableId}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
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
		</div>
	);
};
