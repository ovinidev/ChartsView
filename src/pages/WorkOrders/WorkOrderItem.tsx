import { TData } from "@components/Table/TData";
import { TRead } from "@components/Table/TRead";
import { useSidebar } from "@contexts/useSidebar";
import { WorkOrder } from "@interfaces/workorders";
import { useNavigate } from "react-router-dom";
import { HStack, Icon, Td } from "@chakra-ui/react";
import { RiPencilFill } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { Action, ModalAction } from "@hooks/useModal";
import { Dispatch } from "react";
import { usePermissions } from "@hooks/usePermissions";
interface WorkOrderItemProps {
	data: WorkOrder;
	dispatch: Dispatch<Action>;
	onSetWorkOrderInfo: () => void;
}

export const WorkOrderItem = ({
	data,
	dispatch,
	onSetWorkOrderInfo,
}: WorkOrderItemProps) => {
	const { isAdmin } = usePermissions();

	const navigate = useNavigate();
	const { isDesktop } = useSidebar();

	const handleOpenEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetWorkOrderInfo();
		dispatch({ type: ModalAction.EDIT });
	};

	const handleOpenDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSetWorkOrderInfo();
		dispatch({ type: ModalAction.DELETE });
	};

	return (
		<TRead onClick={() => navigate(`/servicos/${data.id}`)}>
			<TData>{data.title}</TData>
			{isDesktop && <TData>{data.description}</TData>}
			<TData>{data.status}</TData>
			{isAdmin && (
				<Td>
					<HStack spacing="4">
						<Icon
							fontSize="26"
							color="gray.700"
							as={RiPencilFill}
							onClick={handleOpenEdit}
							cursor="pointer"
						/>

						<Icon
							fontSize="26"
							color="gray.700"
							as={TbTrash}
							onClick={handleOpenDelete}
							cursor="pointer"
						/>
					</HStack>
				</Td>
			)}
		</TRead>
	);
};
