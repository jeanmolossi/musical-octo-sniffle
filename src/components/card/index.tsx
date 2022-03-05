import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
	HiLink,
	HiOutlineChat,
	HiPaperClip,
	HiOutlinePhotograph,
} from "react-icons/hi";
import styles from "./styles.module.scss";
import { Button } from "../button";
import { RenderIf } from "../../helpers/render-if";
import {
	Draggable,
	DraggingStyle,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { classnames } from "../../helpers/classnames";
import { Modal } from "../modal";
import { useModal } from "../../helpers/use-modal";
import { Input } from "../input";

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
	comments = 0,
	lastComments = [],
}: CardProps) => {
	const [isOpen, onOpen, onClose] = useModal();

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
								<HiOutlineChat /> {comments}
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

					<div className={styles.divider}></div>
					<div className={styles.task__comments}>
						<div className={styles.task__comment}>
							<div className={styles.comment__avatar}>
								{RenderIf(
									Boolean(author),
									<img
										src={
											"https://randomuser.me/api/portraits/men/75.jpg"
										}
										alt="Avatar"
									/>
								)}
							</div>

							<div className={styles.comment__content}>
								<span>John Doe says:</span>
								<p>
									I am using this as a reference every I need.
									Thank you!
								</p>
							</div>
						</div>

						<div className={styles.task__comment}>
							<div className={styles.comment__avatar}>
								{RenderIf(
									Boolean(author),
									<img
										src={
											"https://randomuser.me/api/portraits/women/30.jpg"
										}
										alt="Avatar"
									/>
								)}
							</div>

							<div className={styles.comment__content}>
								<span>Elisa Sanches says:</span>
								<p>
									I am using this as a reference every I need.
									Thank you!
								</p>
							</div>
						</div>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.task__comment_area}>
						<Input
							label="Add a comment"
							placeholder="Leave a comment"
							type="text"
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};
