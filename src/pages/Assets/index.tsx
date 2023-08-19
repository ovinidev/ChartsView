import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Heading } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { AssetItem } from "./AssetItem";
import { useAssets } from "@queries/assets";
import { TableContainer } from "@components/Table/TableContainer";

export default function Units() {
	const { data: assets, isLoading } = useAssets();

	return (
		<Flex direction="column">
			<Header />
			<Heading fontWeight={500} m={{ base: "1rem", "4xl": "2rem" }}>
				Máquinas
			</Heading>

			{isLoading ? (
				<Heading>Carregando</Heading>
			) : (
				<TableContainer>
					<Table variant="simple" size="lg">
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
