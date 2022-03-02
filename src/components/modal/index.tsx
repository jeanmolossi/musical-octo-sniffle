import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HiX } from "react-icons/hi";
import { RenderIf } from "../../helpers/render-if";
import { Button } from "../button";
import styles from "./styles.module.scss";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDone?: () => void;
	children?: React.ReactNode;
	closeOnOverlayClick?: boolean;
	closeOnEsc?: boolean;
	title?: string;
}

const ModalContainer = ({
	children,
	onClose,
	onDone,
	closeOnOverlayClick = true,
	closeOnEsc = true,
	title,
}: ModalProps) => {
	const onCloseOverlay = () => {
		if (closeOnOverlayClick) onClose();
	};

	useEffect(() => {
		function onCloseEscape(e: KeyboardEvent) {
			if (e.key === "Escape") {
				onClose();
			}
		}

		if (closeOnEsc) window.addEventListener("keydown", onCloseEscape);

		return () => {
			if (closeOnEsc) {
				window.removeEventListener("keydown", onCloseEscape);
			}
		};
	}, [closeOnEsc]);

	return (
		<div className={styles.modal__overlay} onClick={onCloseOverlay}>
			<div
				className={styles.modal__container}
				onClick={(e) => e.stopPropagation()}
			>
				<header className={styles.modal__header}>
					<h1>{title || ""}</h1>

					<button
						className={styles.modal__close_button}
						onClick={onClose}
					>
						Close <HiX size={20} />
					</button>
				</header>

				<main className={styles.modal__main_content}>{children}</main>

				<footer className={styles.modal__footer}>
					<Button label="Done" variant="success" onClick={onDone} />
					<Button label="Close" variant="danger" onClick={onClose} />
				</footer>
			</div>
		</div>
	);
};

export const Modal = ({ isOpen, ...rest }: ModalProps) => {
	const modalDiv =
		document.getElementById("modal") ?? document.createElement("div");

	modalDiv.id = "modal";
	document.body.appendChild(modalDiv);

	return isOpen
		? ReactDOM.createPortal(
				<ModalContainer isOpen={isOpen} {...rest} />,
				modalDiv ?? document.body
		  )
		: null;
};
