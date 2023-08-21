import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Td } from "@chakra-ui/react";
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

export default function Units() {
	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [asset, setAsset] = useState({} as Asset);
	const { data: assets, isLoading } = useAssets({ name: inputSearch });

	return (
		<Flex direction="column">
			<Header />

			<AnimateOnRender>
				<Title>Máquinas</Title>

				{isLoading ? (
					<ListSkeleton isLoading={isLoading} />
				) : (
					<TableContainer>
						<Flex gap="4">
							<InputSearch handleChange={handleChangeDebounce} />

							<Button
								onClick={() => dispatch({ type: ModalAction.ADD })}
								text="Novo"
								bg="primary"
								color="#FFF"
							/>
						</Flex>

						<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
							<Thead>
								<Tr>
									<THead>Nome</THead>
									<THead>Status</THead>
									<THead>Saúde</THead>
									<Td></Td>
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
		</Flex>
	);
}
