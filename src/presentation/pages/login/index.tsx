import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/presentation/components/button";
import { Input } from "@/presentation/components/input";
import { useAuth } from "@/presentation/contexts/auth";
import styles from "./styles.module.scss";

export const Login = () => {
	const { login } = useAuth();

	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		try {
			login(username, pass);
		} catch (e) {
			const err = e as Error;
			alert(err.message);
		}
	};

	return (
		<div className={styles.container}>
			<h1>Welcome!</h1>

			<form className={styles.form} onSubmit={onSubmit}>
				<fieldset>
					<legend>Sign in</legend>

					<Input
						label="Username"
						placeholder="Ex.: johndoe"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
					/>

					<Input
						label="Password"
						placeholder="type your password"
						type="password"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setPass(e.target.value)
						}
					/>

					<Button label="Login" variant="info" />
				</fieldset>
			</form>
		</div>
	);
};
