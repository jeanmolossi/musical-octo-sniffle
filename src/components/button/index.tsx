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

	size?: "small" | "medium" | "large";
	withShadow?: boolean;
}

export const Button = ({
	label,
	variant = "neutral",
	type = "button",
	size = "medium",
	withShadow = false,
	...rest
}: ButtonProps) => {
	const className = classnames(
		styles.button,
		styles[variant],
		styles[size],
		withShadow ? styles.withShadow : ""
	);

	return (
		<button className={className} {...rest}>
			{label}
		</button>
	);
};
