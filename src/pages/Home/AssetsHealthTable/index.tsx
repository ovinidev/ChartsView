import { Table, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
import { TableContainer } from "@components/Table/TableContainer";
import { THead } from "@components/Table/THead";
import { TData } from "@components/Table/TData";
import { useAssets } from "@queries/assets";
import { Link } from "react-router-dom";

export const AssetsHealthTable = () => {
	const { data: assets } = useAssets({ name: "" });

	return (
		<TableContainer align="center" ml="0">
			<Table
				variant="striped"
				colorScheme="messenger"
				size={{ base: "md", "4xl": "lg" }}
			>
				<Thead>
					<Tr>
						<THead>Nome</THead>
						<THead>Saúde</THead>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{assets?.map((asset) => {
						return (
							<Tr key={asset.id}>
								<TData>{asset.name}</TData>
								<TData>{asset.healthscore}%</TData>
								<Td>
									<Link to="/maquinas">Ver mais</Link>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
