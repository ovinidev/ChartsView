import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Td } from "@chakra-ui/react";
import { THead } from "@components/Table/THead";
import { TableContainer } from "@components/Table/TableContainer";
import { Title } from "@components/Title";
import { useWorkOrders } from "@queries/workorders";
import { WorkOrderItem } from "./WorkOrderItem";
import { ListSkeleton } from "@components/Skeletons/ListSkeleton";
import { InputSearch } from "@components/Form/InputSearch";
import { useSearch } from "@hooks/useSearch";
import { useSidebar } from "@contexts/useSidebar";
import { Pagination } from "@components/Pagination";
import { AnimateOnRender } from "@components/Motions/AnimateOnRender";
import { ModalAction, useModal } from "@hooks/useModal";
import { useState } from "react";
import { WorkOrder } from "@interfaces/workorders";
import { Button } from "@components/Buttons/Button";

export default function WorkOrders() {
	const { isDesktop } = useSidebar();
	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [workOrder, setWorkOrder] = useState({} as WorkOrder);
	const { data: workOrders, isLoading } = useWorkOrders({ title: inputSearch });

	return (
		<Flex direction="column">
			<Header />

			<AnimateOnRender>
				<Title>Ordens de Serviços</Title>

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
									<THead>Título</THead>
									{isDesktop && <THead>Descrição</THead>}
									<THead>Status</THead>
									<Td></Td>
								</Tr>
							</Thead>
							<Tbody>
								{workOrders?.map((unit) => {
									return (
										<WorkOrderItem
											key={unit.id}
											data={unit}
											dispatch={dispatch}
											onSetWorkOrderInfo={() => setWorkOrder(unit)}
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
