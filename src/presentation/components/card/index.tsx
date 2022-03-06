import React, { useEffect, useMemo, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import {
	HiLink,
	HiOutlineChat,
	HiPaperClip,
	HiOutlinePhotograph,
	HiPaperAirplane,
} from "react-icons/hi";
import { api } from "@/data/api";
import { RenderIf } from "@/helpers/render-if";
import { classnames } from "@/helpers/classnames";
import { useModal } from "@/helpers/use-modal";
import { Button } from "@/presentation/components/button";
import { Modal } from "@/presentation/components/modal";
import { Input } from "@/presentation/components/input";
import { useAuth } from "@/presentation/contexts/auth";
import styles from "./styles.module.scss";

interface ApiComment {
	userName: string;
	userPhoto?: string;
	comment: string;
	createdAt: string;
}

interface CartAttachment {
	type: "file" | "image" | "link";
	attachment: string;
}

interface Category {
	type: "neutral" | "success" | "warning" | "danger" | "info" | "highlight";
	text: string;
}

export interface CardProps {
	id: number;
	index: number;
	title: string;
	author?: string;
	createdAt: string;
	description?: string;
	image?: string;
	attachments?: CartAttachment[];
	categories?: Category[];
	comments?: number;
	lastComments?: string[];
	isDragging?: boolean;
}

export const Card = ({
	id,
	index,
	title,
	author = "Confident",
	createdAt,
	description,
	image,
	attachments = [],
	categories = [],
	comments: numComments = 0,
	lastComments = [],
}: CardProps) => {
	const commentInputRef = useRef<HTMLInputElement>(null);
	const [comments, setComments] = useState<ApiComment[]>([]);
	const [isOpen, onOpen, onClose] = useModal();
	const { user } = useAuth();

	const loadComments = async () => {
		const { data: todo } = await api.get<{ comments: ApiComment[] }>(
			`/todo/${id}`
		);

		setComments(todo.comments);
	};

	const sendComment = async () => {
		if (!commentInputRef.current) return;

		await api.post(`/todo/${id}/comment`, {
			comment: commentInputRef.current.value,
			userName: user.user,
			userPhoto: user.photo,
		});

		commentInputRef.current.value = "";
		await loadComments();
	};

	const date = useMemo(() => {
		const _date = new Date(createdAt).toDateString();

		const datesMatch = _date.match(/[\w\d]+/g);
		if (datesMatch?.length && datesMatch.length > 2) {
			const [_, month, day] = datesMatch;

			return `${day} ${month}`;
		}

		return "";
	}, [createdAt]);

	const truncateDescription = useMemo(() => {
		if (description) {
			const truncatedDescription = description.substring(0, 100);

			return `${truncatedDescription}...`;
		}

		return "";
	}, [description]);

	const IconAttachment = (type: "file" | "image" | "link") => {
		switch (type) {
			case "file":
				return <HiPaperClip />;
			case "image":
				return <HiOutlinePhotograph />;
			default:
				return <HiLink />;
		}
	};

	useEffect(() => {
		loadComments();
	}, []);

	return (
		<>
			<Draggable draggableId={`${id}`} index={index}>
				{(provided) => (
					<div
						className={classnames(styles.card)}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						onClick={onOpen}
					>
						<header>
							<div>
								<h1>{title}</h1>
							</div>
							<div className={styles.card__sub_header}>
								<span>{date}</span>
								<span>&#8226;</span>
								<span>
									Criado por <Link to="/team">{author}</Link>
								</span>
							</div>
						</header>

						<main>
							<div className={styles.card__content}>
								{RenderIf(
									Boolean(description),
									<p>{truncateDescription}</p>
								)}

								{RenderIf(
									Boolean(image),
									<div className={styles.card__content_image}>
										<img src={image} alt="Card" />
									</div>
								)}

								{RenderIf(
									Boolean(attachments.length),
									<ul className={styles.card__link_list}>
										{attachments.map((attachment, key) => (
											<li key={key}>
												<a
													href="#"
													title={
														attachment.attachment
													}
												>
													{IconAttachment(
														attachment.type
													)}
													<span>
														{attachment.attachment}
													</span>
												</a>
											</li>
										))}
									</ul>
								)}
							</div>

							{RenderIf(
								Boolean(categories.length),
								<div className={styles.card__categories}>
									{categories.map((category, key) => (
										<Button
											key={key}
											size="small"
											variant={category.type}
											label={category.text}
										/>
									))}
								</div>
							)}
						</main>

						<footer>
							<button className={styles.card__comments_button}>
								<HiOutlineChat /> {numComments}
							</button>

							<div className={styles.card__avatar_group}>
								{lastComments.map((photo, key) => (
									<div
										key={key}
										className={styles.card__avatar}
									>
										<img src={photo} alt="Avatar" />
									</div>
								))}
							</div>
						</footer>
					</div>
				)}
			</Draggable>

			<Modal isOpen={isOpen} onClose={onClose}>
				<div className={styles.modal__content}>
					<h1>{title}</h1>

					<h2>TODO description</h2>
					<p>{description || ""}</p>

					{RenderIf(
						categories.length > 0,
						<>
							<div className={styles.divider}></div>
							<div>
								{categories.map((category, key) => (
									<Button
										key={key}
										label={category.text}
										variant={category.type}
									/>
								))}
							</div>
						</>
					)}
					{RenderIf(
						comments.length > 0,
						<>
							<div className={styles.divider}></div>
							<div className={styles.task__comments}>
								{comments.map((comment, key) => (
									<div
										className={styles.task__comment}
										key={key}
									>
										<div className={styles.comment__avatar}>
											{RenderIf(
												Boolean(comment.userPhoto),
												<img
													src={comment.userPhoto}
													alt="Avatar"
												/>
											)}
										</div>

										<div
											className={styles.comment__content}
										>
											<span>
												{comment.userName} says:
											</span>
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
		</>
	);
};
