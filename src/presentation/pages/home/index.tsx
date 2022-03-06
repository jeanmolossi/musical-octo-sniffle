import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "@/presentation/components";
import { ApiTask } from "@/domain";
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
	const { onDragEnd, tasks } = useHomeBehaviors(props);

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
