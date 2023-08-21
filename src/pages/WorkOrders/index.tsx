import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { useWorkOrders } from "@queries/workorders";
import { WorkOrderItem } from "./WorkOrderItem";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";

export default function WorkOrders() {
	const { data: workOrders, isLoading } = useWorkOrders();

	return (
		<Flex direction="column">
			<Header />

			<Title>Serviços</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
						<Thead>
							<Tr>
								<THead>Título</THead>
								<THead>Descrição</THead>
								<THead>Status</THead>
							</Tr>
						</Thead>
						<Tbody>
							{workOrders?.map((unit) => {
								return <WorkOrderItem key={unit.id} data={unit} />;
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<NavigationDrawer />
		</Flex>
	);
}
