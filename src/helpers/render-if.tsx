import React from "react";

export const RenderIf = (condition: boolean, children: React.ReactNode) => {
	if (condition) {
		return children;
	}

	return null;
};
