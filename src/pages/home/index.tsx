import React from "react";
import { Card } from "../../components/card";
import styles from "./styles.module.scss";

export const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.boardContainer}>
				<h2>TO DO</h2>

				<Card
					title="Card"
					author="John Doe"
					createdAt={new Date().toISOString()}
					description="Please use trello and designs in Dribbble as reference. And carry on"
					image="https://cdn.pixabay.com/photo/2021/11/20/23/53/desert-6812927_960_720.jpg"
					attachments={[
						{ type: "file", attachment: "docs.google.com" },
						{ type: "image", attachment: "img.google.com" },
						{ type: "link", attachment: "url.google.com" },
					]}
					categories={[
						{ type: "neutral", text: "Design" },
						{ type: "success", text: "Development" },
						{ type: "warning", text: "UML" },
					]}
					comments={2}
					lastComments={[
						"https://randomuser.me/api/portraits/men/81.jpg",
						"https://randomuser.me/api/portraits/women/41.jpg",
					]}
				/>
				<Card
					title="Card"
					author="John Doe"
					createdAt={new Date().toISOString()}
					image="https://cdn.pixabay.com/photo/2021/11/20/23/53/desert-6812927_960_720.jpg"
					categories={[
						{ type: "danger", text: "Backend" },
						{ type: "info", text: "Architectural" },
						{ type: "highlight", text: "Deploy" },
					]}
				/>
				<Card
					title="Card"
					author="John Doe"
					createdAt={new Date().toISOString()}
					attachments={[
						{ type: "file", attachment: "docs.google.com" },
						{ type: "image", attachment: "docs.google.com" },
						{ type: "link", attachment: "docs.google.com" },
					]}
					categories={[
						{ type: "neutral", text: "Design" },
						{ type: "success", text: "Development" },
						{ type: "warning", text: "UML" },
					]}
					comments={1}
					lastComments={[
						"https://randomuser.me/api/portraits/women/41.jpg",
					]}
				/>
			</div>

			<div className={styles.boardContainer}>
				<h2>Doing</h2>

				<Card
					title="Card"
					author="John Doe"
					createdAt={new Date().toISOString()}
					attachments={[
						{ type: "file", attachment: "docs.google.com" },
						{ type: "image", attachment: "docs.google.com" },
						{ type: "link", attachment: "docs.google.com" },
					]}
					categories={[
						{ type: "neutral", text: "Design" },
						{ type: "success", text: "Development" },
						{ type: "warning", text: "UML" },
					]}
					comments={1}
					lastComments={[
						"https://randomuser.me/api/portraits/women/41.jpg",
					]}
				/>
			</div>

			<div className={styles.boardContainer}>
				<h2>Done</h2>

				<Card
					title="Card"
					author="John Doe"
					createdAt={new Date().toISOString()}
					image="https://cdn.pixabay.com/photo/2021/11/20/23/53/desert-6812927_960_720.jpg"
					categories={[
						{ type: "danger", text: "Backend" },
						{ type: "info", text: "Architectural" },
						{ type: "highlight", text: "Deploy" },
					]}
				/>
			</div>
		</div>
	);
};
