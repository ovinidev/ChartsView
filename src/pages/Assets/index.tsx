import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { AssetItem } from "./AssetItem";
import { useAssets } from "@queries/assets";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";

export default function Units() {
	const { data: assets, isLoading } = useAssets();

	return (
		<Flex direction="column">
			<Header />

			<Title>Máquinas</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
						<Thead>
							<Tr>
								<THead>Nome</THead>
								<THead>Status</THead>
								<THead>Saúde</THead>
							</Tr>
						</Thead>
						<Tbody>
							{assets?.map((asset) => {
								return <AssetItem key={asset.id} data={asset} />;
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<NavigationDrawer />
		</Flex>
	);
}
