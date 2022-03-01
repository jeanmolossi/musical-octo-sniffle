import React, { useMemo } from "react";
import { generateLabelID } from "../../helpers/generateLabelID";
import { RenderIf } from "../../helpers/render-if";
import styles from "./styles.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = ({ label, ...rest }: InputProps) => {
	const id = useMemo(
		() => (!!label ? generateLabelID() : undefined),
		[label]
	);

	return (
		<div className={[styles.input].join(" ")}>
			{RenderIf(!!label, <label htmlFor={id}>{label}</label>)}
			<input id={id} {...rest} />
		</div>
	);
};
