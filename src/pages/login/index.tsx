import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import styles from "./styles.module.scss";

export const Login = () => {
	const navigate = useNavigate();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		navigate("/home");
	};

	return (
		<div className={styles.container}>
			<h1>Welcome!</h1>

			<form className={styles.form} onSubmit={onSubmit}>
				<fieldset>
					<legend>Sign in</legend>

					<Input label="Username" placeholder="Ex.: johndoe" />

					<Input
						label="Password"
						placeholder="type your password"
						type="password"
					/>

					<Button label="Login" variant="info" />
				</fieldset>
			</form>
		</div>
	);
};
