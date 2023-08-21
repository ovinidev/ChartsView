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
import { ButtonContainer } from "@components/Buttons/ButtonContainer";
import { Button } from "@components/Buttons/Button";
import { CompanyProps, useCreateCompany } from "@mutations/companies";
import { createCompanySchema } from "@validations/createCompanySchema";

interface CreateCompanyModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const CreateCompanyModal = ({
	isOpen,
	onClose,
}: CreateCompanyModalProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CompanyProps>({
		resolver: zodResolver(createCompanySchema),
	});

	const { mutateAsync: createCompany, isLoading } = useCreateCompany();

	const onSubmit: SubmitHandler<CompanyProps> = async (data) => {
		await createCompany(data);

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
					Nova empresa
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
