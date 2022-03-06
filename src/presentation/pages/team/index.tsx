import React from "react";
import team from "@/presentation/config/users.json";
import styles from "./styles.module.scss";

export const Team = () => {
	const renderPhoto = (photo?: string) => {
		if (!photo) {
			return "https://randomuser.me/api/portraits/lego/1.jpg";
		}

		return photo;
	};

	return (
		<div className={styles.container}>
			<h1>Team</h1>

			<div className={styles.team}>
				{team.map((user) => (
					<div className={styles.user} key={user.id}>
						<img src={renderPhoto(user.photo)} alt={user.user} />
						<div className={styles.name}>{user.user}</div>
						<div className={styles.role}>{user.username}</div>
					</div>
				))}
			</div>
		</div>
	);
};
