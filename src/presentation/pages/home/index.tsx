import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ApiTask } from "@/domain";
import { useModal } from "@/helpers";
import { Board, Card } from "@/presentation/components";
import { NewTaskModal } from "./components/new-task-modal";
import { useHomeBehaviors } from "./home-behaviors";
import styles from "./styles.module.scss";

export interface HomeProps {
	loadTodos: () => Promise<ApiTask[]>;
	moveTodo: (
		todoId: number,
		toIndex: number,
		toBoardRef: string
	) => Promise<void>;
}

export const Home = (props: HomeProps) => {
	const [isOpenTodo, onOpenTodo, onCloseTodo] = useModal();
	const [isOpenDoing, onOpenDoing, onCloseDoing] = useModal();
	const [isOpenDone, onOpenDone, onCloseDone] = useModal();

	const { onDragEnd, tasks, onDone } = useHomeBehaviors(props);

	return (
		<div className={styles.container}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Board
					title="TO DO"
					droppableId="todoColumn"
					onOpen={onOpenTodo}
				>
					{tasks.todo.map((card, index) => (
						<Card key={card.id} {...card} index={index} />
					))}
				</Board>

				<Board
					title="Doing"
					droppableId="doingColumn"
					onOpen={onOpenDoing}
				>
					{tasks.doing.map((card, index) => (
						<Card key={card.id} {...card} index={index} />
					))}
				</Board>

				<Board
					title="Done"
					droppableId="doneColumn"
					onOpen={onOpenDone}
				>
					{tasks.done.map((card, index) => (
						<Card key={card.id} {...card} index={index} />
					))}
				</Board>
			</DragDropContext>

			<NewTaskModal
				isOpen={isOpenTodo}
				onClose={onCloseTodo}
				title="To Do"
				onDone={onDone("todoColumn", tasks.todo)}
			/>

			<NewTaskModal
				isOpen={isOpenDoing}
				onClose={onCloseDoing}
				title="Doing"
				onDone={onDone("doingColumn", tasks.doing)}
			/>

			<NewTaskModal
				isOpen={isOpenDone}
				onClose={onCloseDone}
				title="Done"
				onDone={onDone("doneColumn", tasks.done)}
			/>
		</div>
	);
};
