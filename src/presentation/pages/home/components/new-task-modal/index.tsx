import React, { useCallback } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { RenderIf } from "@/helpers";
import { Modal, Input, Button } from "@/presentation/components";
import { useNewTaskModalBehaviors } from "./use-new-task-modal-behaviors";

export interface NewTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	onDone: (
		callback: (
			biggerBoardIndex: number,
			board: string
		) => Promise<void> | void
	) => Promise<void> | void;
}

export const NewTaskModal = ({
	isOpen,
	onClose,
	title,
	onDone,
}: NewTaskModalProps) => {
	const {
		localOnDone,
		titleRef,
		descriptionRef,
		categories,
		onToggleCategory,
	} = useNewTaskModalBehaviors({ onDone, onClose });

	return (
		<Modal isOpen={isOpen} onClose={onClose} onDone={localOnDone}>
			<h2>New task - {title}</h2>

			<Input
				ref={titleRef}
				label="Todo Title"
				placeholder="Ex.: Finish backend learning"
			/>

			<Input
				ref={descriptionRef}
				label="Todo Description"
				placeholder="Ex.: Finish backend learning"
			/>

			<div>
				<label>Select todo categories</label>
				<br />
				{categories.map(
					({ categoryId, label, categoryType, selected }) => (
						<Button
							onClick={onToggleCategory(categoryId)}
							variant={categoryType}
							key={categoryId}
						>
							{RenderIf(!!selected, <HiCheckCircle />)}
							{label}
						</Button>
					)
				)}
			</div>
		</Modal>
	);
};
