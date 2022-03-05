import React, { useMemo } from "react";
import { generateLabelID } from "../../helpers/generateLabelID";
import { RenderIf } from "../../helpers/render-if";
import styles from "./styles.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	ref?: React.Ref<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ label, ...rest }: InputProps, ref) => {
		const id = useMemo(
			() => (!!label ? generateLabelID() : undefined),
			[label]
		);

		return (
			<div className={[styles.input].join(" ")}>
				{RenderIf(!!label, <label htmlFor={id}>{label}</label>)}
				<input ref={ref} id={id} {...rest} />
			</div>
		);
	}
);
