import { ChangeEvent, useCallback, useState } from "react";

type UseInput = [string, (e: ChangeEvent<HTMLInputElement>) => void];

export function useInput(): UseInput {
	const [value, setValue] = useState("");

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
		[]
	);

	return [value, onChange];
}
