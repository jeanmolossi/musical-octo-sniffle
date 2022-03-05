import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { HiPlusCircle } from "react-icons/hi";
import { useModal } from "../../helpers/use-modal";
import { Button } from "../button";
import { Card, CardProps } from "../card";
import { Input } from "../input";
import { Modal } from "../modal";
import styles from "./styles.module.scss";

interface BoardProps {
	title: string;
	droppableId: string;
	cards: CardProps[];
}

export const Board = ({ cards, title, droppableId }: BoardProps) => {
	const [isOpen, onOpen, onClose] = useModal();

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

			<Modal isOpen={isOpen} onClose={onClose}>
				<h2>New task - {title}</h2>

				<Input
					label="Todo Title"
					placeholder="Ex.: Finish backend learning"
				/>

				<Input
					label="Todo Description"
					placeholder="Ex.: Finish backend learning"
				/>

				<div>
					<label>Select todo categories</label>
					<br />
					<Button variant="success">Development</Button>
					<Button variant="neutral">Design</Button>
					<Button variant="warning">UML</Button>
					<Button variant="danger">Backend</Button>
					<Button variant="info">Architectural</Button>
					<Button variant="highlight">Deploy</Button>
				</div>
			</Modal>
		</div>
	);
};
