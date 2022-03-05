import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import cards from "../../data/cards.json";
import { CardProps } from "../../components/card";
import styles from "./styles.module.scss";
import { Board } from "../../components/board";
import { api } from "../../data/api";

export type ApiTask = {
	todoId: number;
	title: string;
	description: string;
	boardIndex: number;
	boardRef: string;
	categories?: { categoryId: number; categoryType: string; label: string }[];
	comments?: {
		commentId: number;
		userName: string;
		userPhoto: string;
		comment: string;
		createdAt: string;
		todoId: number;
	}[];
};

type Tasks = {
	todo: CardProps[];
	doing: CardProps[];
	done: CardProps[];
};

export const Home = () => {
	const [tasks, setTasks] = useState<Tasks>({
		todo: [],
		doing: [],
		done: [],
	});

	const moveTodo = async (
		todoId: number,
		toIndex: number,
		toBoardRef: string
	) => {
		await api.put(`/todo/${todoId}`, {
			boardIndex: toIndex,
			boardRef: toBoardRef,
		});
	};

	const loadTasks = async () => {
		const { data: todos } = await api.get<ApiTask[]>("/todo");

		const todo = todos
			.filter((_todo) => _todo.boardRef === "todoColumn")
			.map(
				(_todo) =>
					({
						..._todo,
						id: _todo.todoId,
						index: _todo.boardIndex,
						createdAt: new Date().toLocaleDateString(),
						categories:
							_todo.categories?.map((category) => ({
								type: category.categoryType,
								text: category.label,
							})) || [],
						comments: _todo.comments?.length || 0,
						lastComments:
							_todo.comments
								?.map(({ userPhoto }) => userPhoto)
								.filter((_, index) => index < 3) || [],
					} as CardProps)
			)
			.sort((a, b) => a.index - b.index);

		const doing = todos
			.filter((_todo) => _todo.boardRef === "doingColumn")
			.map(
				(_todo) =>
					({
						..._todo,
						id: _todo.todoId,
						index: _todo.boardIndex,
						createdAt: new Date().toLocaleDateString(),
						categories:
							_todo.categories?.map((category) => ({
								type: category.categoryType,
								text: category.label,
							})) || [],
						comments: _todo.comments?.length || 0,
						lastComments:
							_todo.comments
								?.map(({ userPhoto }) => userPhoto)
								.filter((_, index) => index < 3) || [],
					} as CardProps)
			)
			.sort((a, b) => a.index - b.index);

		const done = todos
			.filter((_todo) => _todo.boardRef === "doneColumn")
			.map(
				(_todo) =>
					({
						..._todo,
						id: _todo.todoId,
						index: _todo.boardIndex,
						createdAt: new Date().toLocaleDateString(),
						categories:
							_todo.categories?.map((category) => ({
								type: category.categoryType,
								text: category.label,
							})) || [],
						comments: _todo.comments?.length || 0,
						lastComments:
							_todo.comments
								?.map(({ userPhoto }) => userPhoto)
								.filter((_, index) => index < 3) || [],
					} as CardProps)
			)
			.sort((a, b) => a.index - b.index);

		setTasks({ todo, doing, done });
	};

	const list = (droppableId: string) => {
		const keys: { [k: string]: keyof typeof tasks } = {
			todoColumn: "todo",
			doingColumn: "doing",
			doneColumn: "done",
		};

		return keys[droppableId] as keyof typeof tasks;
	};

	const moveSameColumn = async ({ source, destination }: DropResult) => {
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

		await Promise.all([
			moveTodo(
				result[destination.index].id,
				destination.index,
				destination.droppableId
			),
			moveTodo(result[source.index].id, source.index, source.droppableId),
		]);
	};

	const moveBetweenColumns = async ({ source, destination }: DropResult) => {
		if (source.droppableId === destination!.droppableId) {
			return;
		}

		const sourceTaskKey = list(source.droppableId);
		const destinationTaskKey = list(destination!.droppableId);

		const sourceTask = Array.from(tasks[sourceTaskKey]);
		const destinationTask = Array.from(tasks[destinationTaskKey]);
		const [removed] = sourceTask.splice(source.index, 1);

		destinationTask.splice(destination!.index, 0, removed);

		const newState = { ...tasks };
		newState[sourceTaskKey] = sourceTask;
		newState[destinationTaskKey] = destinationTask;

		setTasks(newState);
		await Promise.all(
			sourceTask.map((_task, i) =>
				moveTodo(_task.id, i, source.droppableId)
			)
		);
		await Promise.all(
			destinationTask.map((_task, i) =>
				moveTodo(_task.id, i, destination!.droppableId)
			)
		);
	};

	const onDragEnd = async (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		await moveSameColumn(result);
		await moveBetweenColumns(result);
	};

	useEffect(() => {
		loadTasks();
	}, []);

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
