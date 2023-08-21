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
import { createAssetSchema } from "@validations/createAssetSchema";
import { AssetProps, useCreateAsset } from "@mutations/assets";

interface CreateAssetModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const CreateAssetModal = ({
	isOpen,
	onClose,
}: CreateAssetModalProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AssetProps>({
		resolver: zodResolver(createAssetSchema),
	});

	const { mutateAsync: createAsset, isLoading } = useCreateAsset();

	const onSubmit: SubmitHandler<AssetProps> = async (data) => {
		await createAsset({
			...data,
			healthscore: Number(data.healthscore),
		});

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
					Nova máquina
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
							{...register("status")}
							error={errors.status}
							label="Status"
							w="100%"
						/>

						<Input
							{...register("healthscore")}
							error={errors.healthscore}
							label="Saúde"
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
