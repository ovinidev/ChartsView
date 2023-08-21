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
import { createUserSchema } from "@validations/createUserSchema";
import { useMutation } from "@tanstack/react-query";
import { USERS } from "@constants/entities";
import { queryClient } from "@services/queryClient";
import { ButtonContainer } from "@components/Buttons/ButtonContainer";
import { Button } from "@components/Buttons/Button";

interface CreateUserModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface CreateUserProps {
	name: string;
	email: string;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateUserProps>({
		resolver: zodResolver(createUserSchema),
	});

	const { mutateAsync: createUser, isLoading } = useMutation(
		async (data: CreateUserProps) => {
			return {
				id: Math.random(),
				companyId: 1,
				unitId: 1,
				name: data.name,
				email: data.email,
			};
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData([USERS], (prevData: any) => [
					...prevData,
					data,
				]);
			},
		},
	);

	const onSubmit: SubmitHandler<CreateUserProps> = async (data) => {
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
					Novo Usuário
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
							{...register("name")}
							error={errors.name}
							label="Nome"
							w="100%"
						/>
						<Input
							{...register("email")}
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
								text="Adicionar"
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
