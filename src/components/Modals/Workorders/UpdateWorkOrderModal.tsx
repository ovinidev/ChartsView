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
import { WorkOrder } from "@interfaces/workorders";
import { WorkOrdersProps, useUpdateWorkOrders } from "@mutations/workorders";

interface UpdateWorkOrderModalProps {
	workOrderData: WorkOrder;
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateWorkOrderModal = ({
	workOrderData,
	isOpen,
	onClose,
}: UpdateWorkOrderModalProps) => {
	const [workOrderInput, setWorkOrderInput] = useState({
		title: workOrderData.title,
		description: workOrderData.description,
		status: workOrderData.status,
	} as WorkOrdersProps);

	const handleCloseModal = () => {
		onClose();
		setWorkOrderInput({
			title: "",
			description: "",
			status: "",
		});
	};

	const { mutateAsync: updateWorkOrder, isLoading } = useUpdateWorkOrders({
		workOrderData,
	});

	const handleUpdateWorkOrder = () => {
		updateWorkOrder({
			...workOrderData,
			title: workOrderInput.title,
			description: workOrderInput.description,
			status: workOrderInput.status,
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
							defaultValue={workOrderData.title}
							onChange={(e) =>
								setWorkOrderInput({
									title: e.target.value,
									description: workOrderInput.description,
									status: workOrderInput.status,
								})
							}
							label="Título"
							w="100%"
						/>

						<Input
							defaultValue={workOrderData.description}
							onChange={(e) =>
								setWorkOrderInput({
									title: workOrderInput.title,
									description: e.target.value,
									status: workOrderInput.status,
								})
							}
							label="Descrição"
							w="100%"
						/>

						<Input
							defaultValue={workOrderData.status}
							onChange={(e) =>
								setWorkOrderInput({
									title: workOrderInput.title,
									description: workOrderInput.description,
									status: e.target.value,
								})
							}
							label="Status"
							w="100%"
						/>

						<ButtonContainer mt="2rem" alignSelf="center">
							<Button onClick={handleCloseModal} text="Cancelar" />

							<Button
								bg="primary"
								color="#FFF"
								isLoading={isLoading}
								type="button"
								onClick={handleUpdateWorkOrder}
								text="Editar"
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
