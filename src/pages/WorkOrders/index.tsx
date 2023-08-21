import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { useWorkOrders } from "@queries/workorders";
import { WorkOrderItem } from "./WorkOrderItem";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";
import { InputSearch } from "@components/Form/InputSearch";
import { useSearch } from "@hooks/useSearch";

export default function WorkOrders() {
	const { inputSearch, handleChangeDebounce } = useSearch();
	const { data: workOrders, isLoading } = useWorkOrders({ title: inputSearch });

	return (
		<Flex direction="column">
			<Header />

			<Title>Serviços</Title>

			{isLoading ? (
				<ListSkeleton isLoading={isLoading} />
			) : (
				<TableContainer>
					<InputSearch handleChange={handleChangeDebounce} />

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
