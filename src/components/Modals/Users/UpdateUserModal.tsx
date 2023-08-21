import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Stack,
} from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { ButtonContainer } from "@components/Buttons/ButtonContainer";
import { Button } from "@components/Buttons/Button";
import { User } from "@interfaces/users";
import { useUpdateUser } from "@mutations/users";
import { useState } from "react";

interface UpdateUserModalProps {
	userData: User;
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateUserModal = ({
	userData,
	isOpen,
	onClose,
}: UpdateUserModalProps) => {
	const [userInput, setUserInput] = useState({
		email: userData.email,
		name: userData.name,
	});

	const handleCloseModal = () => {
		onClose();
		setUserInput({
			email: "",
			name: "",
		});
	};

	const { mutateAsync: updateUser, isLoading } = useUpdateUser({
		userData,
	});

	const handleUpdateUser = () => {
		updateUser({
			...userData,
			name: userInput.name,
			email: userInput.email,
		});

		handleCloseModal();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="xl">
			<ModalOverlay bg="modalOverlay" />
			<ModalContent w="90%" bg="white">
				<ModalHeader fontSize={{ base: "16", "4xl": "22" }}>
					Editar Usuário
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing="6" as="form" pb="2rem">
						<Input
							label="Nome"
							w="100%"
							defaultValue={userData.name}
							onChange={(e) =>
								setUserInput({
									name: e.target.value,
									email: userInput.email,
								})
							}
						/>
						<Input
							label="Email"
							w="100%"
							defaultValue={userData.email}
							onChange={(e) =>
								setUserInput({
									name: userInput.name,
									email: e.target.value,
								})
							}
						/>

						<ButtonContainer mt="2rem" alignSelf="center">
							<Button onClick={handleCloseModal} text="Cancelar" />

							<Button
								bg="primary"
								color="#FFF"
								isLoading={isLoading}
								type="button"
								text="Editar"
								onClick={handleUpdateUser}
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
