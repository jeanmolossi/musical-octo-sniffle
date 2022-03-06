import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { HiPlusCircle } from "react-icons/hi";
import { Button, CardProps } from "@/presentation/components";
import styles from "./styles.module.scss";

interface BoardProps {
	title: string;
	droppableId: string;
	children?: React.ReactNode;
	onOpen: () => void;
}

export const Board = ({ onOpen, title, droppableId, children }: BoardProps) => {
	return (
		<div className={styles.boardContainer}>
			<h2>
				{title}
				<Button variant="highlight" onClick={onOpen}>
					<HiPlusCircle />
				</Button>
			</h2>

			<Droppable droppableId={droppableId}>
				{(provided) => (
					<div
						style={{ minHeight: 500 }}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{children}

						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};
