/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { USERS } from "@constants/entities";
import { queryClient } from "@services/queryClient";
import { ButtonContainer } from "@components/Buttons/ButtonContainer";
import { Button } from "@components/Buttons/Button";
import { useUsers } from "@queries/users";
import { User } from "@interfaces/users";
import { updateUserSchema } from "@validations/updateUserSchema";

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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<User>({
		resolver: zodResolver(updateUserSchema),
	});

	const { data: users } = useUsers({ name: "" });

	const { mutateAsync: createUser, isLoading } = useMutation(
		async (data: User) => {
			return {
				...userData,
				name: data.name ? data.name : userData.name,
				email: data.email ? data.email : userData.name,
			};
		},
		{
			onSuccess: (data) => {
				const userToEditIndex = users?.findIndex(
					(user) => user.id === userData.id,
				);

				if (users && userToEditIndex !== undefined) {
					users[userToEditIndex] = data;

					queryClient.setQueryData([USERS], () => users);
				}
			},
		},
	);

	const onSubmit: SubmitHandler<User> = async (data) => {
		await createUser(data);

		handleCloseModal();
	};

	const handleCloseModal = () => {
		onClose();
		reset();
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
					<Stack
						spacing="6"
						as="form"
						onSubmit={handleSubmit(onSubmit)}
						pb="2rem"
					>
						<Input
							{...register("name", { required: false })}
							error={errors.name}
							label="Nome"
							w="100%"
						/>
						<Input
							{...register("email", { required: false })}
							error={errors.email}
							label="Email"
							w="100%"
						/>

						<ButtonContainer mt="2rem" alignSelf="center">
							<Button onClick={handleCloseModal} text="Cancelar" />

							<Button
								bg="primary"
								color="#FFF"
								isLoading={isLoading}
								type="submit"
								text="Editar"
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
