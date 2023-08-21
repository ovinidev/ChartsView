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
import { useState } from "react";
import { useUpdateCompany } from "@mutations/companies";
import { Company } from "@interfaces/companies";

interface UpdateCompanyModalProps {
	companyData: Company;
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateCompanyModal = ({
	companyData,
	isOpen,
	onClose,
}: UpdateCompanyModalProps) => {
	const [companyInput, setCompanyInput] = useState({
		name: companyData.name,
	});

	const handleCloseModal = () => {
		onClose();
		setCompanyInput({
			name: "",
		});
	};

	const { mutateAsync: updateCompany, isLoading } = useUpdateCompany({
		companyData,
	});

	const handleUpdateCompany = () => {
		updateCompany({
			...companyData,
			name: companyInput.name,
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
							defaultValue={companyData.name}
							onChange={(e) =>
								setCompanyInput({
									name: e.target.value,
								})
							}
							label="Nome"
							w="100%"
						/>

						<ButtonContainer mt="2rem" alignSelf="center">
							<Button onClick={handleCloseModal} text="Cancelar" />

							<Button
								bg="primary"
								color="#FFF"
								isLoading={isLoading}
								type="button"
								onClick={handleUpdateCompany}
								text="Editar"
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
