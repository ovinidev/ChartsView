import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Heading } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { useUnits } from "@queries/units";
import { UnitItem } from "./UnitItem";
import { TableContainer } from "@components/Table/TableContainer";

export default function Units() {
	const { data: units, isLoading } = useUnits();

	return (
		<Flex direction="column">
			<Header />
			<Heading fontWeight={500} m={{ base: "1rem", "4xl": "2rem" }}>
				Unidades
			</Heading>

			{isLoading ? (
				<Heading>Carregando</Heading>
			) : (
				<TableContainer>
					<Table variant="simple" size="lg">
						<Thead>
							<Tr>
								<THead>Id</THead>
								<THead>Nome</THead>
							</Tr>
						</Thead>
						<Tbody>
							{units?.map((unit) => {
								return <UnitItem key={unit.id} data={unit} />;
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<NavigationDrawer />
		</Flex>
	);
}
