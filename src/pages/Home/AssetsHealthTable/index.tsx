import { Table, Thead, Tbody, Tr } from "@chakra-ui/react";
import { TableContainer } from "@components/Table/TableContainer";
import { THead } from "@components/Table/THead";
import { TData } from "@components/Table/TData";
import { useAssets } from "@queries/assets";

export const AssetsHealthTable = () => {
	const { data: assets } = useAssets();

	return (
		<TableContainer align="center">
			<Table variant="striped" size={{ base: "md", "4xl": "lg" }}>
				<Thead>
					<Tr>
						<THead>Nome</THead>
						<THead>Modelo</THead>
						<THead>Saúde</THead>
					</Tr>
				</Thead>
				<Tbody>
					{assets?.map((asset) => {
						return (
							<Tr key={asset.id}>
								<TData>{asset.name}</TData>
								<TData>{asset.model}</TData>
								<TData>{asset.healthscore}%</TData>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
