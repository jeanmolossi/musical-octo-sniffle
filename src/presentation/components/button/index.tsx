import React from "react";
import { classnames } from "@/helpers/classnames";
import { RenderIf } from "@/helpers/render-if";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	variant?:
		| "neutral"
		| "success"
		| "warning"
		| "danger"
		| "info"
		| "highlight";

	size?: "small" | "medium" | "large";
	withShadow?: boolean;
	children?: React.ReactNode;
}

export const Button = ({
	label,
	variant = "neutral",
	type = "button",
	size = "medium",
	withShadow = false,
	children,
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
			{RenderIf(!!label && !children, <>{label}</>)}
			{RenderIf(!label && !!children, <>{children}</>)}
			{RenderIf(
				!!label && !!children,
				<>Somente uma propriedade (label ou children)</>
			)}
		</button>
	);
};
