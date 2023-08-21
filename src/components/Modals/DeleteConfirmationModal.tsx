import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogOverlay,
	Text,
	Stack,
} from "@chakra-ui/react";
import { Button } from "@components/Buttons/Button";
import { ButtonContainer } from "@components/Buttons/ButtonContainer";
import { useRef } from "react";

interface DeleteConfirmationModalProps {
	title: string;
	description: string;
	onDeleteRequest: () => Promise<void>;
	onClose: () => void;
	isOpen: boolean;
}

export const DeleteConfirmationModal = ({
	title,
	description,
	onDeleteRequest,
	onClose,
	isOpen,
}: DeleteConfirmationModalProps) => {
	const cancelRef = useRef(null);

	const onDelete = async () => {
		await onDeleteRequest();
		onClose();
	};

	return (
		<AlertDialog
			isOpen={isOpen}
			onClose={onClose}
			leastDestructiveRef={cancelRef}
			motionPreset="slideInBottom"
			isCentered
		>
			<AlertDialogOverlay bg="modalOverlay">
				<AlertDialogContent w="80%" bg="white" borderRadius="8px">
					<AlertDialogHeader color="dark.90" fontSize="26" px="3rem">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>
						<Stack align="center" spacing="20" px="1.4rem">
							<Text mt="0.75rem" fontSize="18">
								{description}
							</Text>

							<ButtonContainer pb="1rem">
								<Button
									text="Cancelar"
									onClick={onClose}
									_focus={{
										filter: "brightness(0.8)",
									}}
								/>

								<Button
									bg="error.50"
									onClick={onDelete}
									color="white"
									text="Remover"
								/>
							</ButtonContainer>
						</Stack>
					</AlertDialogBody>

					<AlertDialogCloseButton />
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
