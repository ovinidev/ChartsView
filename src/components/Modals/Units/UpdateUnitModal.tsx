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
import { CompanyProps } from "@mutations/companies";
import { useUpdateUnit } from "@mutations/units";
import { Unit } from "@interfaces/units";

interface UpdateUnitModalProps {
	unitData: Unit;
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateUnitModal = ({
	unitData,
	isOpen,
	onClose,
}: UpdateUnitModalProps) => {
	const [unitInput, setUnitInput] = useState({} as CompanyProps);

	const handleCloseModal = () => {
		onClose();
		setUnitInput({
			name: "",
		});
	};

	const { mutateAsync: createUser, isLoading } = useUpdateUnit({
		unitData,
	});

	const handleUpdateCompany = () => {
		createUser({
			...unitData,
			name: unitInput.name,
		});

		handleCloseModal();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="xl">
			<ModalOverlay bg="modalOverlay" />
			<ModalContent w="90%" bg="white">
				<ModalHeader fontSize={{ base: "16", "4xl": "22" }}>
					Editar Unidade
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing="6" as="form" pb="2rem">
						<Input
							defaultValue={unitData.name}
							onChange={(e) =>
								setUnitInput({
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
