import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import cards from "../../data/cards.json";
import { Card, CardProps } from "../../components/card";
import styles from "./styles.module.scss";
import { Board } from "../../components/board";

type Tasks = {
	todo: CardProps[];
	doing: CardProps[];
	done: CardProps[];
};

const { todo, doing, done } = cards as Tasks;

export const Home = () => {
	const [tasks, setTasks] = useState<Tasks>({ todo, doing, done });

	const list = (droppableId: string) => {
		const keys: { [k: string]: keyof typeof tasks } = {
			todoColumn: "todo",
			doingColumn: "doing",
			doneColumn: "done",
		};

		return keys[droppableId] as keyof typeof tasks;
	};

	const moveSameColumn = ({ source, destination }: DropResult) => {
		if (source.droppableId !== destination?.droppableId) {
			return;
		}

		const taskKey = list(source.droppableId);

		const result = Array.from(tasks[taskKey]);
		const [removed] = result.splice(source.index, 1);
		result.splice(destination.index, 0, removed);

		const newState = { ...tasks };
		newState[taskKey] = result;

		setTasks(newState);
	};

	const moveBetweenColumns = ({ source, destination }: DropResult) => {
		if (source.droppableId === destination!.droppableId) {
			return;
		}

		const sourceTaskKey = list(source.droppableId);
		const destinationTaskKey = list(destination!.droppableId);

		console.log({ sourceTaskKey, destinationTaskKey });

		const sourceTask = Array.from(tasks[sourceTaskKey]);
		const destinationTask = Array.from(tasks[destinationTaskKey]);
		const [removed] = sourceTask.splice(source.index, 1);

		destinationTask.splice(destination!.index, 0, removed);

		const newState = { ...tasks };
		newState[sourceTaskKey] = sourceTask;
		newState[destinationTaskKey] = destinationTask;

		console.log(newState);

		setTasks(newState);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		moveSameColumn(result);
		moveBetweenColumns(result);
	};

	return (
		<div className={styles.container}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Board
					title="TO DO"
					droppableId="todoColumn"
					cards={tasks.todo}
				/>

				<Board
					title="Doing"
					droppableId="doingColumn"
					cards={tasks.doing}
				/>

				<Board
					title="Done"
					droppableId="doneColumn"
					cards={tasks.done}
				/>
			</DragDropContext>
		</div>
	);
};
