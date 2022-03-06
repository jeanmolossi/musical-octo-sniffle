import { useState, useEffect, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { CardProps } from "@/presentation/components";
import { todoFromColumn, fromApiTaskToCardProps, ascByIndex } from "./helpers";
import { HomeProps } from "./";
import { useModal } from "@/helpers";

type Tasks = {
	todo: CardProps[];
	doing: CardProps[];
	done: CardProps[];
};

type Columns = keyof Tasks;

type WithIndex = { index: number };

export function useHomeBehaviors({ loadTodos, moveTodo }: HomeProps) {
	const [isOpenTaskModal, onOpenTaskModal, onCloseTaskModal] = useModal();

	const [tasks, setTasks] = useState<Tasks>({
		todo: [],
		doing: [],
		done: [],
	});

	const loadTasks = useCallback(async () => {
		const todos = await loadTodos();

		const todo = todos
			.filter(todoFromColumn("todoColumn"))
			.map(fromApiTaskToCardProps)
			.sort(ascByIndex);

		const doing = todos
			.filter(todoFromColumn("doingColumn"))
			.map(fromApiTaskToCardProps)
			.sort(ascByIndex);

		const done = todos
			.filter(todoFromColumn("doneColumn"))
			.map(fromApiTaskToCardProps)
			.sort(ascByIndex);

		setTasks({ todo, doing, done });
	}, []);

	const list = useCallback((droppableId: string) => {
		const keys: { [k: string]: Columns } = {
			todoColumn: "todo",
			doingColumn: "doing",
			doneColumn: "done",
		};

		return keys[droppableId] as Columns;
	}, []);

	const moveSameColumn = useCallback(
		async ({ source, destination }: DropResult) => {
			if (source.droppableId !== destination?.droppableId) {
				return;
			}

			const columnName = list(source.droppableId);

			const columnClone = Array.from(tasks[columnName]);
			const [removedTask] = columnClone.splice(source.index, 1);
			columnClone.splice(destination.index, 0, removedTask);

			const newColumnState = { ...tasks };
			newColumnState[columnName] = columnClone;

			setTasks(newColumnState);

			await Promise.all([
				moveTodo(
					columnClone[destination.index].id,
					destination.index,
					destination.droppableId
				),
				moveTodo(
					columnClone[source.index].id,
					source.index,
					source.droppableId
				),
			]);
		},
		[list, tasks, moveTodo]
	);

	const moveBetweenColumns = useCallback(
		async ({ source, destination }: DropResult) => {
			if (source.droppableId === destination!.droppableId) {
				return;
			}

			const sourceColumn = list(source.droppableId);
			const destinationColumn = list(destination!.droppableId);

			const sourceColumnClone = Array.from(tasks[sourceColumn]);
			const destinationColumnClone = Array.from(tasks[destinationColumn]);
			const [removed] = sourceColumnClone.splice(source.index, 1);

			destinationColumnClone.splice(destination!.index, 0, removed);

			const newColumnsState = { ...tasks };
			newColumnsState[sourceColumn] = sourceColumnClone;
			newColumnsState[destinationColumn] = destinationColumnClone;

			setTasks(newColumnsState);
			await Promise.all(
				sourceColumnClone.map((_task, i) =>
					moveTodo(_task.id, i, source.droppableId)
				)
			);
			await Promise.all(
				destinationColumnClone.map((_task, i) =>
					moveTodo(_task.id, i, destination!.droppableId)
				)
			);
		},
		[list, tasks, moveTodo]
	);

	const onDragEnd = useCallback(
		async (result: DropResult) => {
			if (!result.destination) {
				return;
			}

			await moveSameColumn(result);
			await moveBetweenColumns(result);
		},
		[moveSameColumn, moveBetweenColumns]
	);

	const onDone = useCallback(
		(board: string, cards: WithIndex[]) =>
			async (
				onDoneCallback: (
					biggerBoardIndex: number,
					board: string
				) => Promise<void> | void
			) => {
				const biggerBoardIndex = cards.reduce(
					(acc, card, i) => Math.max(acc, card.index, i) + 1,
					0
				);

				await onDoneCallback(biggerBoardIndex, board);
				await loadTasks();
			},
		[]
	);

	const [selectedTodo, setSelectedTodo] = useState(0);
	const onOpenTask = useCallback((todoId: number) => {
		return () => {
			setSelectedTodo(todoId);
			onOpenTaskModal();
		};
	}, []);

	const onCloseTask = useCallback(async () => {
		onCloseTaskModal();
		await loadTasks();
	}, []);

	useEffect(() => {
		loadTasks();
	}, []);

	return {
		tasks,
		onDragEnd,
		onDone,

		/** TASK MODAL */
		selectedTodo,
		isOpenTaskModal,
		onOpenTask,
		onCloseTask,
	};
}
