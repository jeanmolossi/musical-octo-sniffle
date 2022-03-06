import React from "react";
import { Button } from "@/presentation/components";
import { Input } from "@/presentation/components";
import { useLoginBehaviors } from "./login-behaviors";
import styles from "./styles.module.scss";

export const Login = () => {
	const { onChangePassword, onChangeUsername, onSubmit } =
		useLoginBehaviors();

	return (
		<div className={styles.container}>
			<h1>Welcome!</h1>

			<form className={styles.form} onSubmit={onSubmit}>
				<fieldset>
					<legend>Sign in</legend>

					<Input
						label="Username"
						placeholder="Ex.: johndoe"
						onChange={onChangeUsername}
					/>

					<Input
						label="Password"
						placeholder="type your password"
						type="password"
						onChange={onChangePassword}
					/>

					<Button label="Login" variant="info" />
				</fieldset>
			</form>
		</div>
	);
};
