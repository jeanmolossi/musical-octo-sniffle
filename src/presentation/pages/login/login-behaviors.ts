import { FormEvent, useCallback } from "react";
import { useInput } from "@/helpers";
import { useAuth } from "@/presentation/contexts";

export function useLoginBehaviors() {
	const { login } = useAuth();

	const [username, onChangeUsername] = useInput();
	const [pass, onChangePassword] = useInput();

	const onSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			try {
				login(username, pass);
			} catch (e) {
				const err = e as Error;
				alert(err.message);
			}
		},
		[username, pass]
	);

	return {
		onSubmit,
		onChangeUsername,
		onChangePassword,
	};
}
