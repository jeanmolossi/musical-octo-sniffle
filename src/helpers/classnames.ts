export function classnames(...styles: string[]): string {
	return styles.filter(Boolean).join(" ");
}
