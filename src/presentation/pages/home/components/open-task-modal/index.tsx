import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import { RenderIf } from "@/helpers";
import { Modal, Button, Input } from "@/presentation/components";
import { api } from "@/data/api";
import { ApiTask } from "@/domain";
import { useAuth } from "@/presentation/contexts";
import { addComment, loadTodo } from "@/data";
import styles from "./styles.module.scss";

interface OpenTaskModalProps {
	todoId: number;
	isOpen: boolean;
	onClose: () => void;
}

export const OpenTaskModal = ({
	todoId,
	isOpen,
	onClose,
}: OpenTaskModalProps) => {
	const { user } = useAuth();
	const commentInputRef = useRef<HTMLInputElement>(null);

	const [task, setTask] = useState({} as ApiTask);

	const sendComment = useCallback(async () => {
		if (!commentInputRef.current) return;

		await addComment({
			todoId,
			comment: commentInputRef.current.value,
			userName: user.name,
			userPhoto: user.photo,
		});

		commentInputRef.current.value = "";
		await loadTodo(todoId).then(setTask);
	}, [todoId]);

	useEffect(() => {
		if (isOpen) loadTodo(todoId).then(setTask);
	}, [loadTodo, todoId, isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles.modal__content}>
				<h1>{task.title}</h1>

				<h2>TODO description</h2>
				<p>{task.description || ""}</p>

				{RenderIf(
					!!(task.categories && task.categories.length > 0),
					<>
						<div className={styles.divider}></div>
						<div>
							{task.categories?.map((category, key) => (
								<Button
									key={key}
									label={category.label}
									variant={category.categoryType}
								/>
							))}
						</div>
					</>
				)}
				{RenderIf(
					!!(task.comments && task.comments.length > 0),
					<>
						<div className={styles.divider}></div>
						<div className={styles.task__comments}>
							{task.comments?.map((comment, key) => (
								<div className={styles.task__comment} key={key}>
									<div className={styles.comment__avatar}>
										{RenderIf(
											Boolean(comment.userPhoto),
											<img
												src={comment.userPhoto}
												alt="Avatar"
											/>
										)}
									</div>

									<div className={styles.comment__content}>
										<span>{comment.userName} says:</span>
										<p>{comment.comment}</p>
									</div>
								</div>
							))}
						</div>
					</>
				)}

				<div className={styles.divider}></div>
				<div className={styles.task__comment_area}>
					<Input
						ref={commentInputRef}
						label="Add a comment"
						placeholder="Leave a comment"
						type="text"
					/>
					<Button variant="highlight" onClick={sendComment}>
						<HiPaperAirplane />
					</Button>
				</div>
			</div>
		</Modal>
	);
};
