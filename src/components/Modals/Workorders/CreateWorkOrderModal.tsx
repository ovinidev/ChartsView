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
import { createWorkOrderSchema } from "@validations/createWorkOrderSchema";
import { WorkOrdersProps, useCreateWorkOrders } from "@mutations/workorders";

interface CreateWorkOrderModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const CreateWorkOrderModal = ({
	isOpen,
	onClose,
}: CreateWorkOrderModalProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<WorkOrdersProps>({
		resolver: zodResolver(createWorkOrderSchema),
	});

	const { mutateAsync: createWorkOrder, isLoading } = useCreateWorkOrders();

	const onSubmit: SubmitHandler<WorkOrdersProps> = async (data) => {
		await createWorkOrder(data);

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
					Nova ordem de serviço
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
							{...register("title")}
							error={errors.title}
							label="Título"
							w="100%"
						/>

						<Input
							{...register("description")}
							error={errors.description}
							label="Descrição"
							w="100%"
						/>

						<Input
							{...register("status")}
							error={errors.status}
							label="Status"
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
