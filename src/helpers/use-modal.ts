import { useState } from "react";

type onOpen = () => void;
type onClose = () => void;
type UseModal = [boolean, onOpen, onClose];

export function useModal(): UseModal {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return [isOpen, openModal, closeModal];
}
