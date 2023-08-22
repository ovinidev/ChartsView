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
import { AssetProps, useUpdateAsset } from "@mutations/assets";
import { Asset } from "@interfaces/assets";

interface UpdateAssetModalProps {
	assetData: Asset;
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateAssetModal = ({
	assetData,
	isOpen,
	onClose,
}: UpdateAssetModalProps) => {
	const [assetInput, setAssetInput] = useState({
		name: assetData.name,
		status: assetData.status,
		healthscore: assetData.healthscore,
	} as AssetProps);

	const handleCloseModal = () => {
		onClose();
		setAssetInput({
			name: "",
			status: "",
			healthscore: 0,
		});
	};

	const { mutateAsync: updateAsset, isLoading } = useUpdateAsset({
		assetData,
	});

	const handleUpdateAsset = () => {
		updateAsset({
			...assetData,
			name: assetInput.name,
			status: assetInput.status,
			healthscore: assetInput.healthscore,
		});

		handleCloseModal();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="xl">
			<ModalOverlay bg="modalOverlay" />
			<ModalContent w="90%" bg="white">
				<ModalHeader fontSize={{ base: "16", "4xl": "22" }}>
					Editar máquina
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing="6" as="form" pb="2rem">
						<Input
							defaultValue={assetData.name}
							onChange={(e) =>
								setAssetInput({
									name: e.target.value,
									healthscore: assetInput.healthscore,
									status: assetInput.status,
								})
							}
							label="Nome"
							w="100%"
						/>

						<Input
							defaultValue={assetData.status}
							onChange={(e) =>
								setAssetInput({
									name: assetInput.name,
									status: e.target.value,
									healthscore: assetInput.healthscore,
								})
							}
							label="Status"
							w="100%"
						/>

						<Input
							defaultValue={assetData.healthscore}
							onChange={(e) =>
								setAssetInput({
									name: assetInput.name,
									status: assetInput.status,
									healthscore: Number(e.target.value),
								})
							}
							label="Saúde"
							w="100%"
						/>

						<ButtonContainer mt="2rem" alignSelf="center">
							<Button onClick={handleCloseModal} text="Cancelar" />

							<Button
								bg="primary"
								color="#FFF"
								isLoading={isLoading}
								type="button"
								onClick={handleUpdateAsset}
								text="Editar"
							/>
						</ButtonContainer>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
