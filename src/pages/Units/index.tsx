import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { useUnits } from "@queries/units";
import { UnitItem } from "./UnitItem";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";

export default function Units() {
	const { data: units, isLoading } = useUnits();

	return (
		<Flex direction="column">
			<Header />

			<Title>Unidades</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
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
