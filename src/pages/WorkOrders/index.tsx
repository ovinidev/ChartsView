import { Header } from "@components/Header";
import { NavigationDrawer } from "@components/Drawers/NavigationDrawer";
import { Table, Thead, Tbody, Tr, Flex, Th } from "@chakra-ui/react";
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
import { useCallback, useState } from "react";
import { WorkOrder } from "@interfaces/workorders";
import { Button } from "@components/Buttons/Button";
import { CreateWorkOrderModal } from "@components/Modals/Workorders/CreateWorkOrderModal";
import { UpdateWorkOrderModal } from "@components/Modals/Workorders/UpdateWorkOrderModal";
import { DeleteConfirmationModal } from "@components/Modals/DeleteConfirmationModal";
import { useDeleteWorkOrders } from "@mutations/workorders";
import { usePermissions } from "@hooks/usePermissions";

export default function WorkOrders() {
	const { isAdmin } = usePermissions();

	const { isDesktop } = useSidebar();
	const { dispatch, state } = useModal();
	const { inputSearch, handleChangeDebounce } = useSearch();

	const [workOrder, setWorkOrder] = useState({} as WorkOrder);
	const { data: workOrders, isLoading } = useWorkOrders({ title: inputSearch });

	const { mutateAsync: deleteWorkOrder } = useDeleteWorkOrders();

	const handleDeleteWorkOrder = useCallback(async () => {
		await deleteWorkOrder(workOrder);
	}, []);

	return (
		<Flex direction="column">
			<title>Ordens de Serviço</title>

			<Header />

			<AnimateOnRender>
				<Title>Ordens de Serviços</Title>

				{isLoading ? (
					<ListSkeleton isLoading={isLoading} />
				) : (
					<TableContainer>
						<Flex gap="4">
							<InputSearch handleChange={handleChangeDebounce} />

							{isAdmin && (
								<Button
									onClick={() => dispatch({ type: ModalAction.ADD })}
									text="Novo"
									bg="primary"
									color="#FFF"
								/>
							)}
						</Flex>

						<Table variant="simple" size={{ base: "md", "4xl": "lg" }}>
							<Thead>
								<Tr>
									<THead>Título</THead>
									{isDesktop && <THead>Descrição</THead>}
									<THead>Status</THead>
									{isAdmin && <Th></Th>}
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

			<CreateWorkOrderModal
				isOpen={state.modalAdd}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<UpdateWorkOrderModal
				workOrderData={workOrder}
				isOpen={state.modalEdit}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>

			<DeleteConfirmationModal
				title="Deletar ordem de serviço"
				description="Tem Certeza que deseja deletar a  ordem de serviço?"
				onDeleteRequest={handleDeleteWorkOrder}
				isOpen={state.modalDelete}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>
		</Flex>
	);
}
