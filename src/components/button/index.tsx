import React from "react";
import { classnames } from "../../helpers/classnames";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	variant?:
		| "neutral"
		| "success"
		| "warning"
		| "danger"
		| "info"
		| "highlight";
}

export const Button = ({
	label,
	variant = "neutral",
	type = "button",
	...rest
}: ButtonProps) => {
	return (
		<button
			className={classnames(styles.button, styles[variant])}
			{...rest}
		>
			{label}
		</button>
	);
};
