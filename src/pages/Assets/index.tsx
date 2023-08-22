import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Th } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { AssetItem } from "./AssetItem";
import { useAssets } from "@queries/assets";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";
import { InputSearch } from "@components/Form/InputSearch";
import { useSearch } from "@hooks/useSearch";
import { Pagination } from "@components/Pagination";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { ModalAction, useModal } from "@hooks/useModal";
import { useState } from "react";
import { Asset } from "@interfaces/assets";
import { Button } from "@components/Buttons/Button";
import { CreateAssetModal } from "@components/Modals/Assets/CreateAssetModal";
import { UpdateAssetModal } from "@components/Modals/Assets/UpdateAssetModal";
import { DeleteConfirmationModal } from "@components/Modals/DeleteConfirmationModal";
import { useDeleteAsset } from "@mutations/assets";
import { usePermissions } from "@hooks/usePermissions";

export default function Units() {
	const { isAdmin } = usePermissions();
	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [asset, setAsset] = useState({} as Asset);
	const { data: assets, isLoading } = useAssets({ name: inputSearch });

	const { mutateAsync: deleteAsset } = useDeleteAsset();

	const handleDeleteAsset = async () => {
		await deleteAsset(asset);
	};

	return (
		<Flex direction="column">
			<title>Máquinas</title>

			<Header />

			<AnimateOnRender>
				<Title>Máquinas</Title>

				{isLoading ? (
					<ListSkeleton isLoading={isLoading} />
				) : (
					<TableContainer>
						<Flex gap="4">
							<InputSearch handleChange={handleChangeDebounce} />

							{isAdmin && (
								<Button
									onClick={() => dispatch({ type: ModalAction.ADD })}
									text="Novo"
									bg="primary"
									color="#FFF"
								/>
							)}
						</Flex>

						<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
							<Thead>
								<Tr>
									<THead>Nome</THead>
									<THead>Status</THead>
									<THead>Saúde</THead>
									{isAdmin && <Th></Th>}
								</Tr>
							</Thead>
							<Tbody>
								{assets?.map((asset) => {
									return (
										<AssetItem
											key={asset.id}
											data={asset}
											dispatch={dispatch}
											onSetAssetInfo={() => setAsset(asset)}
										/>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				)}
			</AnimateOnRender>

			<Pagination
				mt="2rem"
				alignSelf="center"
				isLoading={isLoading}
				page={1}
				pageLength={5}
				totalItems={5}
			/>

			<NavigationDrawer />

			<CreateAssetModal
				isOpen={state.modalAdd}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<UpdateAssetModal
				assetData={asset}
				isOpen={state.modalEdit}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<DeleteConfirmationModal
				onDeleteRequest={handleDeleteAsset}
				title="Deletar máquina"
				description="Tem certeza que deseja deletar a máquina?"
				isOpen={state.modalDelete}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>
		</Flex>
	);
}
